'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import '../../app/globals.css'

interface FixedMenuProps {
  isShown?: boolean
}

export function FixedMenu({ isShown = true }: FixedMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={cn(
        "fixed flex justify-center pointer-events-none left-0 right-0 z-50 fixed-menu-container",
        isShown ? "bottom-[34px]" : "-bottom-[60px]"
      )}>
        <div className={cn(
          "pointer-events-auto relative w-[128px] h-[46px] bg-black/50 backdrop-blur-[10px] rounded-[23px] text-white text-[18px] fixed-menu",
          isOpen && "rounded-[24px] w-[286px] h-[312px] bg-black/70"
        )}>
          <nav 
            className={cn(
              "p-[22px] invisible opacity-0",
              isOpen && "visible opacity-100 h-[240px]"
            )}
            aria-hidden={!isOpen}
          >
            {['About', 'Products', 'Team', 'Company'].map((item, i) => (
              <button
                key={item}
                aria-label={item}
                className={cn(
                  "h-[42px] text-[19px] flex transform translate-y-6 blur-[10px]",
                  isOpen && "animate-menuItemEnter"
                )}
                style={{
                  animationDelay: `${0.13 + (i * 0.05)}s`
                }}
              >
                {item}
              </button>
            ))}
            <div 
              className={cn(
                "mt-[5px] flex gap-[6px] transform translate-y-6 blur-[10px]",
                isOpen && "animate-menuItemEnter"
              )}
              style={{ animationDelay: "0.34s" }}
            >
              <a className="text-white/50 hover:text-white text-[16px]" href="/en">EN</a>
              <span className="text-white/30">/</span>
              <a className="text-white/50 hover:text-white text-[16px] aria-[current=page]:text-white" href="/ja" aria-current="page">JA</a>
            </div>
          </nav>
          <button
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-[8px] pl-[24px] h-[46px] fixed-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open Menu"
          >
            <span className="overflow-hidden h-[19px] leading-[19px]">
              <span 
                className="flex flex-col fixed-menu-text-inner"
                style={{
                  transform: isOpen ? 'translateY(-19px)' : 'none'
                }}
                aria-hidden="true"
              >
                <span className="block fixed-menu-text-open">Menu</span>
                <span className={cn(
                  "block text-white/70 fixed-menu-text-close",
                  isOpen ? "opacity-100" : "opacity-0"
                )}>Close</span>
              </span>
            </span>
            <span className="h-full aspect-square bg-white/20 rounded-full grid place-items-center">
              <Plus 
                className="w-[21px] h-[21px] fixed-menu-icon"
                style={{
                  transform: isOpen ? 'rotate(45deg)' : 'none'
                }}
              />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default FixedMenu;