
import React from 'react';
import { MobileFooterLink, ZainaColor, PageName } from '../types';
import { MOBILE_FOOTER_LINKS_DATA } from '../constants';

interface MobileStickyFooterProps {
  navigateToPage: (page: PageName, data?: any) => void;
}

const MobileStickyFooter: React.FC<MobileStickyFooterProps> = ({ navigateToPage }) => {
  if (!MOBILE_FOOTER_LINKS_DATA || MOBILE_FOOTER_LINKS_DATA.length === 0) return null;

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, link: MobileFooterLink) => {
    event.preventDefault(); 
    let pageName: PageName | undefined = link.pageName as PageName;

    if (!pageName) {
        const labelLower = link.label.toLowerCase();
        if (labelLower === 'home') pageName = 'home';
        else if (labelLower === 'explore' || labelLower === 'search') pageName = 'shop';
        else if (labelLower === 'profile' || labelLower === 'login') pageName = 'auth'; // Or 'userDashboard' if logged in
        else if (labelLower === 'orders') { alert('Orders page not yet implemented.'); return; } // Or 'userDashboard' with section
        else if (labelLower === 'wishlist') { alert('Wishlist page not yet implemented.'); return; }
        else {
            alert(`Navigating to ${link.label} (placeholder action). Full functionality to be implemented.`);
            return;
        }
    }
    
    if (pageName) {
        navigateToPage(pageName);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zaina-white border-t border-zaina-neutral-medium shadow-top-strong z-[80] flex justify-around items-stretch h-16"
         aria-label="Mobile Bottom Navigation">
      {MOBILE_FOOTER_LINKS_DATA.map((link) => (
        <a
          key={link.id}
          href={link.href} 
          onClick={(e) => handleLinkClick(e, link)}
          aria-label={link.ariaLabel}
          className="flex flex-col items-center justify-center text-zaina-text-primary hover:text-zaina-primary active:text-zaina-primary transition-colors p-1 flex-1 text-center focus:outline-none focus:bg-zaina-neutral-light"
        >
          <link.icon className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">{link.label}</span>
        </a>
      ))}
      <style>{`
        .shadow-top-strong {
          box-shadow: 0 -3px 12px rgba(44, 62, 80, 0.08); /* ${ZainaColor.TextPrimary} with opacity */
        }
      `}</style>
    </nav>
  );
};

export default MobileStickyFooter;
