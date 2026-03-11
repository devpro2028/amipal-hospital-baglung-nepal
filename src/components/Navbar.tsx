'use client'

import React, { useState } from 'react'
import { Menu, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import type { Navigation as NavigationType } from '@/payload-types'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
type NavItem = NonNullable<NavigationType['items']>[number]
type NavChildItem = NonNullable<NavItem['children']>[number]

interface NavbarProps {
  data: NavigationType
}

export function Navbar({ data }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          {data.logoText || 'Acme Inc'}
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav items={data.items || []} />

        {/* Right side: Locale switcher + CTA + Mobile menu */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          {data.ctaLabel && (
            <Button asChild className="hidden md:inline-flex">
              <a href={data.ctaUrl || '#'}>{data.ctaLabel}</a>
            </Button>
          )}
          <MobileNav data={data} />
        </div>
      </div>
    </header>
  )
}

/* ──────────────────────────── Desktop Nav ──────────────────────────── */

function DesktopNav({ items }: { items: NavItem[] }) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0

          if (!hasChildren) {
            return (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuLink href={item.url || '#'} className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-1 p-4 w-[500px] grid-cols-2">
                  {item.description && (
                    <li className="col-span-2 mb-2">
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  )}
                  {item.children!.map((child) => (
                    <Level2Item key={child.id} item={child} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function Level2Item({ item }: { item: NavChildItem }) {
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            href={item.url || '#'}
            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="text-sm font-medium leading-none">{item.label}</div>
            {item.description && (
              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                {item.description}
              </p>
            )}
          </a>
        </NavigationMenuLink>
      </li>
    )
  }

  return (
    <li className="col-span-2">
      <div className="mb-1">
        <div className="text-sm font-medium px-3 pt-3">{item.label}</div>
        {item.description && (
          <p className="text-xs text-muted-foreground px-3 mt-0.5">{item.description}</p>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-1">
        {item.children!.map((grandchild) => (
          <li key={grandchild.id}>
            <NavigationMenuLink asChild>
              <a
                href={grandchild.url || '#'}
                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">{grandchild.label}</div>
                {grandchild.description && (
                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                    {grandchild.description}
                  </p>
                )}
              </a>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </li>
  )
}

/* ──────────────────────────── Mobile Nav ──────────────────────────── */

function MobileNav({ data }: { data: NavigationType }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{data.logoText || 'Menu'}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-4">
          {data.items?.map((item) => (
            <MobileLevel1Item key={item.id} item={item} onNavigate={() => setOpen(false)} />
          ))}
          {data.ctaLabel && (
            <Button asChild className="mt-4">
              <a href={data.ctaUrl || '#'} onClick={() => setOpen(false)}>
                {data.ctaLabel}
              </a>
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function MobileLevel1Item({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <a
        href={item.url || '#'}
        onClick={onNavigate}
        className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        {item.label}
      </a>
    )
  }

  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
        {item.label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-3 border-l pl-3 flex flex-col gap-0.5">
          {item.children!.map((child) => (
            <MobileLevel2Item key={child.id} item={child} onNavigate={onNavigate} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function MobileLevel2Item({ item, onNavigate }: { item: NavChildItem; onNavigate: () => void }) {
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <a
        href={item.url || '#'}
        onClick={onNavigate}
        className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
      >
        {item.label}
      </a>
    )
  }

  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent">
        {item.label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-3 border-l pl-3 flex flex-col gap-0.5">
          {item.children!.map((grandchild) => (
            <a
              key={grandchild.id}
              href={grandchild.url || '#'}
              onClick={onNavigate}
              className="flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {grandchild.label}
            </a>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
