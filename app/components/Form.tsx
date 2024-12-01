"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "password"
    | "textarea"
    | "checkbox"
    | "radio"
    | "select"
    | "switch"
    | "slider"
    | "date";
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  icon?: React.ReactNode;
  required?: boolean;
  hint?: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (formData: FormData) => void;
  submitText: string;
  errors?: Record<string, string[]>;
}

export function Form({ fields, onSubmit, submitText, errors = {} }: FormProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );
  const [dates, setDates] = useState<Record<string, Date | undefined>>({});

  const togglePasswordVisibility = (name: string) => {
    setShowPasswords((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    setDates((prev) => ({ ...prev, [name]: date }));
  };

  const renderField = (field: FormField) => {
    const fieldError = errors[field.name]?.[0];

    const renderError = () =>
      fieldError && (
        <p className="text-sm text-destructive mt-1">{fieldError}</p>
      );

    const renderHint = () =>
      field.hint && <p className="text-sm text-green-500 mt-1">{field.hint}</p>;

    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "tel":
      case "url":
        return (
          <>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
            />
            {renderHint()}
            {renderError()}
          </>
        );
      case "password":
        return (
          <>
            <div className="relative">
              <Input
                id={field.name}
                name={field.name}
                type={showPasswords[field.name] ? "text" : "password"}
                placeholder={field.placeholder}
                required={field.required}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility(field.name)}
              >
                {showPasswords[field.name] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {renderHint()}
            {renderError()}
          </>
        );
      case "textarea":
        return (
          <>
            <Textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
            />
            {renderHint()}
            {renderError()}
          </>
        );
      case "checkbox":
        return (
          <>
            <Checkbox id={field.name} name={field.name} />
            {renderHint()}
            {renderError()}
          </>
        );
      case "radio":
        return (
          <>
            <RadioGroup name={field.name}>
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={`${field.name}-${option.value}`}
                  />
                  <Label htmlFor={`${field.name}-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {renderHint()}
            {renderError()}
          </>
        );
      case "select":
        return (
          <>
            <Select name={field.name}>
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {renderHint()}
            {renderError()}
          </>
        );
      case "switch":
        return (
          <>
            <Switch id={field.name} name={field.name} />
            {renderHint()}
            {renderError()}
          </>
        );
      case "slider":
        return (
          <>
            <Slider name={field.name} defaultValue={[0]} max={100} step={1} />
            {renderHint()}
            {renderError()}
          </>
        );
      case "date":
        return (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dates[field.name] && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dates[field.name] ? (
                    format(dates[field.name]!, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dates[field.name]}
                  onSelect={(date) => handleDateChange(field.name, date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {renderHint()}
            {renderError()}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form action={onSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="flex items-center space-x-2">
            {field.icon}
            <span>{field.label}</span>
          </Label>
          {renderField(field)}
        </div>
      ))}
      <Button type="submit" className="w-full">
        {submitText}
      </Button>
    </form>
  );
}
