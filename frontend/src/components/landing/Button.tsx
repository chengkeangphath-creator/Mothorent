'use client';

import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ice' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  asExternal?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  href,
  asExternal = false,
  className = '',
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  // Base classes for consistent modern feel, soft shadows, rounded corners, focus rings
  const baseClasses =
    'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  // Variant styling with Electric Cyan & Sky Blue Glowing Aura:
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'btn-glow font-black text-white active:scale-[0.98] focus-visible:ring-[#00D2FF]',
    secondary:
      'btn-glow-subtle active:scale-[0.98] focus-visible:ring-[#00D2FF]',
    outline:
      'border-2 border-[#00D2FF] text-[#00D2FF] hover:bg-gradient-to-r hover:from-[#00D2FF] hover:to-[#0284C7] hover:text-white shadow-[0_0_15px_rgba(0,210,255,0.25)] hover:shadow-[0_0_25px_rgba(0,210,255,0.6)] active:scale-[0.98] focus-visible:ring-[#00D2FF]',
    ice:
      'bg-[#DCEAF7] hover:bg-[#C8DEF0] text-[#081426] font-bold shadow-[0_0_15px_rgba(220,234,247,0.3)] active:scale-[0.98] focus-visible:ring-[#00D2FF]',
    ghost:
      'text-slate-700 hover:text-[#00D2FF] hover:bg-[#DCEAF7]/50 dark:text-slate-200 dark:hover:text-[#00D2FF] dark:hover:bg-[#1E3B60] focus-visible:ring-[#00D2FF]',
  };

  // Size specifications
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5 shadow-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      ) : (
        leftIcon && <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </>
  );

  // If href is provided, render semantic Next.js Link
  if (href) {
    if (asExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          aria-disabled={disabled || isLoading}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-disabled={disabled || isLoading}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
