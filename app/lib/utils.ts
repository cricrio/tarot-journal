import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function titleEnv(title: string): string {
  return process.env.NODE_ENV === 'development' ? `${title} - DEV` : title;
}