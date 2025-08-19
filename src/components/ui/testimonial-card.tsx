import React from "react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  className?: string;
  highlightText?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  title,
  className,
  highlightText
}) => {
  const renderQuoteWithHighlight = (text: string, highlight?: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => (
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-devcon-green font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    ));
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-md mx-auto",
      className
    )}>
      <blockquote className="text-gray-700 font-brand text-base leading-relaxed mb-8">
        {renderQuoteWithHighlight(quote, highlightText)}
      </blockquote>
      
      <div className="border-t border-gray-100 pt-6">
        <div className="text-gray-900 font-brand font-semibold text-lg">
          {author}
        </div>
        <div className="text-gray-500 font-brand text-sm mt-1">
          {title}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;