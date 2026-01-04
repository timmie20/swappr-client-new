# Questionnaire Answer Collection Implementation

## Overview

Complete implementation of answer collection system for device valuation questionnaire with cookie-based model tracking, localStorage persistence, and validation.

---

## Architecture

### Flow Diagram

```
User selects model + variation
         ↓
Save to cookies (30min expiry)
         ↓
Navigate to questionnaire
         ↓
Answer questions (saved to localStorage)
         ↓
Validate + Submit
         ↓
Build payload from cookies + localStorage
         ↓
Send to API
```

---

## Components

### 1. Cookie Management (`/src/lib/cookies.ts`)

**Purpose**: Store model_id and variation_id with 30-minute expiry

**Functions**:

- `saveQuestionnaireContext(modelId, variationId)` - Save before navigation
- `getQuestionnaireContext()` - Retrieve saved context
- `clearQuestionnaireContext()` - Clear after submission
- `hasQuestionnaireContext()` - Check if context exists

**Usage**:

```typescript
import {
  saveQuestionnaireContext,
  getQuestionnaireContext,
} from "@/lib/cookies";

// Before navigation
saveQuestionnaireContext(modelId, variationId);

// In questionnaire
const context = getQuestionnaireContext();
if (!context) {
  // Redirect back or show error
}
```

---

### 2. Zustand Store (`/src/store/question-store.tsx`)

**Key Changes**:

- Added `persist` middleware for localStorage
- Changed answers structure: `Record<string, string>` (question_id → option_id)
- Added helper methods: `getAnswers()`, `clearAnswers()`, `hasAnswerForQuestion()`

**State**:

```typescript
{
  questions: Question[];
  currentStep: number;
  answers: Record<string, string>; // { [question_id]: option_id }
  currentQuestion: Question | null;
  progress: number;
  direction: "forward" | "backward";
}
```

**Actions**:

```typescript
setAnswer(questionId, optionId); // Save single answer
getAnswers(); // Get all answers as array
clearAnswers(); // Reset all answers
hasAnswerForQuestion(questionId); // Check if answered
```

**Persistence**:

- localStorage key: `swappr-questionnaire-storage`
- Only persists: `answers` and `currentStep`
- Survives page refresh

---

### 3. Model Detail Page (`/src/features/worth/model-detail.tsx`)

**Changes**:

- Replaced Link with button + onClick handler
- Calls `saveQuestionnaireContext()` before navigation
- Uses `useRouter` for programmatic navigation
- Disabled button if no variation selected

**Flow**:

1. User selects storage variation
2. Clicks "Check your phones worth"
3. Handler saves model_id + variation_id to cookies
4. Navigates to questionnaire with brandId query param

---

### 4. Toggle Select Component (`/src/features/questionnaire/components/toogle-select.tsx`)

**Changes**:

- Added `value` prop (controlled component)
- Added `onValueChange` handler
- Reads current answer from store
- Saves selection immediately on change

**Key Code**:

```typescript
const selectedValue = currentQuestion?.id
  ? answers[currentQuestion.id] || ""
  : "";

const handleValueChange = (value: string) => {
  if (currentQuestion?.id && value) {
    setAnswer(currentQuestion.id, value);
  }
};

<ToggleGroup
  value={selectedValue}
  onValueChange={handleValueChange}
  // ...
>
```

---

### 5. Questions Component (`/src/features/questionnaire/questions.tsx`)

**Added Features**:

1. **Validation**: Check if current question answered before proceeding
2. **Conditional Button**: "Next" vs "Calculate Value" on last question
3. **Disabled State**: Button disabled if no answer selected
4. **Submission Logic**: Build payload, validate, submit to API
5. **Toast Notifications**: Error/success feedback

**Key Logic**:

```typescript
// Validation
const isCurrentQuestionAnswered = hasAnswerForQuestion(currentQuestion.id);
const isLastQuestion = currentStep === questions.length;

// Handle next question
const handleNext = () => {
  if (!isCurrentQuestionAnswered) {
    toast.error("Please select an answer");
    return;
  }
  nextStep();
};

// Handle submission
const handleSubmit = async () => {
  const answers = getAnswers();
  const payload = buildValuationPayload(answers);

  const validationError = validatePayload(payload);
  if (validationError) {
    toast.error(validationError);
    return;
  }

  // Submit to API
  // ...
};
```

---

### 6. Submission Utilities (`/src/lib/questionnaire-submission.ts`)

**Functions**:

#### `buildValuationPayload(answers)`

Combines cookies + store answers into API payload:

```typescript
{
  model_id: "uuid-from-cookie",
  variation_id: "uuid-from-cookie",
  answers: [
    { question_id: "q1", option_id: "opt1" },
    { question_id: "q2", option_id: "opt2" }
  ]
}
```

#### `validatePayload(payload)`

Checks for:

- Missing model_id or variation_id
- Empty answers array
- Invalid answer structures
  Returns error message or null

#### `isQuestionnaireComplete(answers, totalQuestions)`

Verifies all questions have been answered

---

## Data Flow

### 1. Model Selection

```
ModelDetail Component
  ↓
User selects variation
  ↓
Clicks "Check your phones worth"
  ↓
saveQuestionnaireContext(modelId, variationId)
  ↓
Cookies: swappr_model_id, swappr_variation_id
  ↓
router.push('/questionnaire?brandId=...')
```

### 2. Answering Questions

```
Questions Component loads
  ↓
Fetch questions from API
  ↓
initializeQuestions(questions)
  ↓
User clicks option in ToggleGroup
  ↓
onValueChange fires
  ↓
setAnswer(questionId, optionId)
  ↓
localStorage: { answers: { q1: opt1 } }
```

### 3. Submission

```
User clicks "Calculate Value" (last question)
  ↓
handleSubmit()
  ↓
getAnswers() from store
  ↓
getQuestionnaireContext() from cookies
  ↓
buildValuationPayload()
  ↓
validatePayload()
  ↓
POST to API
  ↓
clearAnswers() + clearQuestionnaireContext()
  ↓
Navigate to results
```

---

## API Integration

### Endpoint (To Implement)

```typescript
POST /api/valuations

Request Body:
{
  "model_id": "uuid",
  "variation_id": "uuid",
  "answers": [
    {
      "question_id": "uuid",
      "option_id": "uuid"
    }
  ]
}

Response:
{
  "id": "valuation-uuid",
  "estimated_value": 50000,
  "currency": "NGN"
}
```

### Implementation Example

```typescript
// In handleSubmit function
const response = await fetch("/api/valuations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // if needed
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message || "Submission failed");
}

const result = await response.json();

// Navigate to results
router.push(`/valuation-result/${result.id}`);
```

---

## Error Handling

### Validation Errors

- **No answer selected**: Toast notification, button stays disabled
- **Missing cookies**: Shows error message, redirects to model selection
- **Incomplete questionnaire**: Prevents submission with toast

### Edge Cases Handled

1. **Page refresh**: Answers persist in localStorage
2. **Cookie expiry**: Detected on submission, shows error
3. **Back navigation**: Previous answers are restored
4. **Direct URL access**: Checks for cookies, redirects if missing

---

## Testing Checklist

- [ ] Select model and variation → cookies saved correctly
- [ ] Navigate to questionnaire → cookies retrieved
- [ ] Answer question → saved to localStorage
- [ ] Refresh page → answers persist
- [ ] Navigate back → previous answer shows selected
- [ ] Try to proceed without answer → button disabled
- [ ] Answer all questions → "Calculate Value" button shows
- [ ] Submit → payload built correctly
- [ ] Cookie expires → proper error handling
- [ ] Clear localStorage → answers reset

---

## Future Enhancements

1. **Progress saving**: Auto-save progress to backend
2. **Resume capability**: Allow users to resume incomplete questionnaires
3. **Analytics**: Track completion rates, drop-off points
4. **Validation rules**: Server-side validation for answer combinations
5. **Conditional questions**: Skip questions based on previous answers

---

## Troubleshooting

### Answers not persisting

- Check localStorage: `swappr-questionnaire-storage`
- Verify persist middleware is configured
- Check browser localStorage quota

### Cookies not found

- Check cookie expiry (30 minutes)
- Verify domain/path settings
- Check browser cookie settings

### Button not enabling

- Verify `hasAnswerForQuestion` returns true
- Check ToggleGroup `onValueChange` fires
- Console log `answers` state

---

## Dependencies

```json
{
  "js-cookie": "^3.0.5",
  "@types/js-cookie": "^3.0.6",
  "zustand": "^5.0.9"
}
```

All other dependencies already in project.
