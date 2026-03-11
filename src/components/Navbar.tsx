'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import { Home, ChevronDown, Menu } from 'lucide-react'
import type { Navigation as NavigationType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type NavItem = NonNullable<NavigationType['items']>[number]
type NavChild = NonNullable<NavItem['children']>[number]

interface NavbarProps {
  data: NavigationType
}

// ─── Root ────────────────────────────────────────────────────────────────────

export function Navbar({ data }: NavbarProps) {
  const items = data.items ?? []

  return (
    <nav className="w-full bg-[#1a4698] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-stretch min-h-[60px]">

        {/* ── Red Home Button ── */}
        <Link
          href="/"
          aria-label="Home"
          className={cn(
            'flex items-center justify-center px-6 shrink-0',
            'bg-red-600 hover:bg-red-700 transition-colors duration-200',
            'border-r border-white/15'
          )}
        >
          <Home className="w-5 h-5 fill-white stroke-white" />
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex flex-1 items-stretch overflow-x-auto overflow-y-visible scrollbar-none">
          <DesktopNav items={items} />
        </div>

        {/* ── Mobile Hamburger ── */}
        <div className="md:hidden flex items-center ml-auto pr-3">
          <MobileNav items={items} />
        </div>

      </div>
    </nav>
  )
}

// ─── Desktop Nav ─────────────────────────────────────────────────────────────

function DesktopNav({ items }: { items: NavItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenId(null)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={navRef} className="flex items-stretch h-full">
      {items.map((item) => {
        const hasChildren = !!item.children?.length
        const isOpen = openId === item.id

        if (!hasChildren) {
          return (
            <Link
              key={item.id}
              href={item.url || '#'}
              className={cn(
                'flex items-center justify-center text-center px-4 py-2',
                'text-[12.5px] font-bold uppercase tracking-wide text-white',
                'min-w-[90px] max-w-[140px] leading-tight whitespace-normal',
                'border-r border-white/10',
                'hover:bg-white/10 transition-colors duration-200'
              )}
            >
              {item.label}
            </Link>
          )
        }

        return (
          <div key={item.id} className="relative flex items-stretch">
            {/* Trigger */}
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : (item.id ?? null))}
              onMouseEnter={() => setOpenId(item.id ?? null)}
              className={cn(
                'flex items-center justify-center gap-1 text-center px-4 py-2',
                'text-[12.5px] font-bold uppercase tracking-wide text-white',
                'min-w-[90px] max-w-[140px] leading-tight whitespace-normal',
                'border-r border-white/10',
                'hover:bg-white/10 transition-colors duration-200',
                isOpen && 'bg-white/10'
              )}
            >
              <span>{item.label}</span>
              <ChevronDown
                className={cn(
                  'w-3 h-3 shrink-0 opacity-80 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div
                className="absolute left-0 top-full z-50 min-w-[220px] bg-white text-[#1a4698] shadow-2xl border border-gray-100"
                onMouseLeave={() => setOpenId(null)}
              >
                <ul>
                  {item.children!.map((child) => (
                    <DropdownItem key={child.id} child={child} onClose={() => setOpenId(null)} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Dropdown Item (with optional Level-3 fly-out) ───────────────────────────

function DropdownItem({ child, onClose }: { child: NavChild; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const hasChildren = !!child.children?.length

  return (
    <li
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={child.url || '#'}
        onClick={onClose}
        className={cn(
          'flex items-center justify-between px-5 py-3',
          'text-[13.5px] font-semibold border-b border-gray-100 last:border-0',
          'hover:bg-[#1a4698] hover:text-white transition-all duration-200'
        )}
      >
        <span>{child.label}</span>
        {hasChildren && (
          <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-50 group-hover:opacity-100 shrink-0 ml-2" />
        )}
      </Link>

      {/* Level-3 Fly-out */}
      {hasChildren && open && (
        <div className="absolute left-full top-0 ml-px min-w-[200px] bg-white text-[#1a4698] shadow-2xl border border-gray-100 z-50">
          <ul>
            {child.children!.map((grand) => (
              <li key={grand.id}>
                <Link
                  href={grand.url || '#'}
                  onClick={onClose}
                  className="block px-5 py-3 text-[13px] font-medium border-b border-gray-100 last:border-0 hover:bg-[#1a4698] hover:text-white transition-all"
                >
                  {grand.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

// ─── Mobile Nav ──────────────────────────────────────────────────────────────

function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/15 hover:text-white"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[290px] p-0 bg-[#1a4698] text-white border-l border-white/10"
      >
        <SheetHeader className="px-6 py-5 border-b border-white/10">
          <SheetTitle className="flex items-center gap-2 text-white text-base font-bold">
            <Home className="h-5 w-5 fill-white stroke-white" />
            Navigation
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col overflow-y-auto max-h-[calc(100dvh-80px)]">
          {items.map((item) => (
            <MobileItem key={item.id} item={item} onNavigate={() => setOpen(false)} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const hasChildren = !!item.children?.length
  const base = 'px-6 py-4 text-[14px] font-bold border-b border-white/10 flex items-center'

  if (!hasChildren) {
    return (
      <Link href={item.url || '#'} onClick={onNavigate} className={cn(base, 'hover:bg-white/10 transition-colors')}>
        {item.label}
      </Link>
    )
  }

  return (
    <Collapsible>
      <CollapsibleTrigger
        className={cn(base, 'w-full justify-between hover:bg-white/10 transition-colors group')}
      >
        <span>{item.label}</span>
        <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-[#153980]">
        {item.children?.map((child) => (
          <Link
            key={child.id}
            href={child.url || '#'}
            onClick={onNavigate}
            className="flex items-center pl-10 pr-6 py-3.5 text-[13px] font-medium border-b border-white/5 hover:bg-white/5 transition-colors text-white/90"
          >
            {child.label}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}