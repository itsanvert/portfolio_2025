// components/Footer.tsx
"use client";

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="text-sm text-muted-foreground py-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm">
              {t("footer.copyright", "© 2025 Vert San. All rights reserved.")}
            </p>
          </div>
          {/* Add other footer content here */}
        </div>
      </div>
    </footer>
  );
}
