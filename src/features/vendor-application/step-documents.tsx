// "use client";
// // @ts-nocheck – reserved for later; document fields temporarily removed from schema

// import { motion } from "motion/react";
// import { UseFormReturn } from "react-hook-form";
// import { ArrowLeft, Loader2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Field,
//   FieldLabel,
//   FieldError,
//   FieldContent,
// } from "@/components/ui/field";
// import { FileUpload } from "./file-upload";
// import { ApplicationFormData, ID_TYPES, STEP_3_FIELDS } from "./types";

// interface StepDocumentsProps {
//   form: UseFormReturn<ApplicationFormData>;
//   onNext: () => Promise<void>;
//   onBack: () => void;
//   direction: number;
//   isSubmitting: boolean;
// }

// export function StepDocuments({
//   form,
//   onNext,
//   onBack,
//   direction,
//   isSubmitting,
// }: StepDocumentsProps) {
//   const {
//     formState: { errors },
//     setValue,
//     watch,
//     trigger,
//   } = form;

//   const idType = watch("idType");
//   const idDocumentUrl = watch("idDocumentUrl");
//   const cacDocuments = watch("cacDocuments") ?? [];
//   const storePhotos = watch("storePhotos") ?? [];

//   const handleSubmit = async () => {
//     const valid = await trigger([...STEP_3_FIELDS]);
//     if (valid) await onNext();
//   };

//   const slideVariants = {
//     enter: { opacity: 0, x: direction > 0 ? 60 : -60 },
//     center: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.3,
//         ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
//       },
//     },
//     exit: {
//       opacity: 0,
//       x: direction > 0 ? -60 : 60,
//       transition: {
//         duration: 0.22,
//         ease: [0.36, 0, 0.66, 0] as [number, number, number, number],
//       },
//     },
//   };

//   return (
//     <motion.div
//       variants={slideVariants}
//       initial="enter"
//       animate="center"
//       exit="exit"
//     >
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base font-semibold text-gray-900">
//             Upload your business documents
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="flex flex-col gap-7">
//           {/* ── 1. Government ID ─────────────────────────────────── */}
//           <fieldset className="flex flex-col gap-4">
//             <legend className="text-sm font-semibold text-gray-800">
//               Government Issued ID <span className="text-red-500">*</span>
//             </legend>

//             {/* ID Type */}
//             <Field data-invalid={!!errors.idType}>
//               <FieldContent>
//                 <FieldLabel htmlFor="idType">ID Type</FieldLabel>
//                 <Select
//                   value={idType}
//                   onValueChange={(v) =>
//                     setValue("idType", v as ApplicationFormData["idType"], {
//                       shouldValidate: true,
//                     })
//                   }
//                 >
//                   <SelectTrigger
//                     id="idType"
//                     className="w-full"
//                     aria-invalid={!!errors.idType}
//                   >
//                     <SelectValue placeholder="Select ID type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {ID_TYPES.map((t) => (
//                       <SelectItem key={t.value} value={t.value}>
//                         {t.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.idType && (
//                   <FieldError>{errors.idType.message}</FieldError>
//                 )}
//               </FieldContent>
//             </Field>

//             {/* ID Document upload */}
//             <Field data-invalid={!!errors.idDocumentUrl}>
//               <FieldContent>
//                 <FieldLabel>Upload ID Document</FieldLabel>
//                 <FileUpload
//                   accept=".pdf,image/jpeg,image/png"
//                   maxSizeMB={5}
//                   maxFiles={1}
//                   value={idDocumentUrl ? [idDocumentUrl] : []}
//                   onChange={(urls) =>
//                     setValue("idDocumentUrl", urls[0] ?? "", {
//                       shouldValidate: true,
//                     })
//                   }
//                   previewMode="list"
//                   label="Upload government ID document"
//                   error={errors.idDocumentUrl?.message}
//                 />
//               </FieldContent>
//             </Field>
//           </fieldset>

//           {/* ── 2. CAC Documents ─────────────────────────────────── */}
//           <fieldset className="flex flex-col gap-3">
//             <legend className="text-sm font-semibold text-gray-800">
//               CAC Business Registration <span className="text-red-500">*</span>
//             </legend>
//             <p className="text-xs text-gray-500">
//               Upload your Certificate of Incorporation and other CAC documents
//               (1–3 files, PDF or image).
//             </p>
//             <FileUpload
//               accept=".pdf,image/jpeg,image/png"
//               maxSizeMB={10}
//               minFiles={1}
//               maxFiles={3}
//               value={cacDocuments}
//               onChange={(urls) =>
//                 setValue("cacDocuments", urls, { shouldValidate: true })
//               }
//               previewMode="list"
//               label="Upload CAC documents"
//               error={errors.cacDocuments?.message as string | undefined}
//             />
//           </fieldset>

//           {/* ── 3. Store Photos ───────────────────────────────────── */}
//           <fieldset className="flex flex-col gap-3">
//             <legend className="text-sm font-semibold text-gray-800">
//               Store / Business Photos <span className="text-red-500">*</span>
//             </legend>
//             <p className="text-xs text-gray-500">
//               Upload 2–5 clear photos of your physical store or business
//               premises (JPG or PNG, max 5MB each).
//             </p>
//             <FileUpload
//               accept="image/jpeg,image/png"
//               maxSizeMB={5}
//               minFiles={2}
//               maxFiles={5}
//               value={storePhotos}
//               onChange={(urls) =>
//                 setValue("storePhotos", urls, { shouldValidate: true })
//               }
//               previewMode="grid"
//               label="Upload store photos"
//               error={errors.storePhotos?.message as string | undefined}
//             />
//           </fieldset>

//           {/* Navigation */}
//           <div className="flex gap-3 pt-2">
//             <Button
//               type="button"
//               variant="outline"
//               size="lg"
//               onClick={onBack}
//               className="flex-1 gap-2 rounded-full"
//               disabled={isSubmitting}
//             >
//               <ArrowLeft size={16} />
//               Back
//             </Button>
//             <Button
//               type="button"
//               size="lg"
//               onClick={handleSubmit}
//               className="flex-1 gap-2 rounded-full"
//               disabled={isSubmitting}
//               aria-busy={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 size={16} className="animate-spin" />
//                   Submitting…
//                 </>
//               ) : (
//                 "Submit Application"
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }
