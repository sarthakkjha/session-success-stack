import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency values consistently
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

// Format time values consistently
export function formatTime(minutes: number): string {
  const mins = Math.floor(minutes)
  const secs = Math.floor((minutes - mins) * 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Generate avatar initials consistently
export function getInitials(name: string): string {
  if (!name) return 'U'
  const parts = name.split(' ')
  if (parts.length === 1) return name.charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

// Status badge styles
export function getStatusClass(status: string): string {
  switch (status) {
    case 'success':
      return 'bg-success/20 text-success border-success/30'
    case 'failed':
      return 'bg-destructive/20 text-destructive border-destructive/30'
    case 'in-progress':
      return 'bg-primary/20 text-primary border-primary/30'
    case 'scheduled':
      return 'bg-muted text-muted-foreground border-border'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}
