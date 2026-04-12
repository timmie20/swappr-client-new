import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
  description: string;
}

export function ProductSpecifications({
  specifications,
  description,
}: ProductSpecificationsProps) {
  const hasSpecs = Object.keys(specifications).length > 0;

  return (
    <Accordion type="multiple" defaultValue={["specs"]} className="w-full">
      {hasSpecs && (
        <AccordionItem value="specs">
          <AccordionTrigger className="text-sm font-semibold">
            Specifications
          </AccordionTrigger>
          <AccordionContent>
            <div className="divide-y divide-[#F3F4F6] text-sm">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 py-2.5">
                  <span className="font-medium text-[#6B7280] capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-right text-[#1A1A1A]">{value}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {description && (
        <AccordionItem value="description">
          <AccordionTrigger className="text-sm font-semibold">
            Description
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed text-[#374151]">
              {description}
            </p>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
