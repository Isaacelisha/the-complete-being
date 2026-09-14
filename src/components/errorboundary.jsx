import React from 'react';
import { MASTER_BRAND_LOGO } from '../data.jsx';
import { BtnPrimary } from './shared.jsx';

// --- ERROR BOUNDARY COMPONENT ---
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught editorial exception:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-forest)] flex flex-col items-center justify-center p-6 text-center font-serif">
          <div className="w-16 h-16 md:w-24 md:h-24 mb-6 text-[var(--color-gold)]">{MASTER_BRAND_LOGO.svgPath}</div>
          <h2 className="text-3xl md:text-4xl mb-4">An unexpected rendering exception occurred.</h2>
          <p className="text-xs tracking-widest uppercase text-[var(--color-charcoal-60)] font-sans max-w-md mb-8">Our editorial engine caught a runtime exception. Please click below to safely re-initialize the library session.</p>
          
          {typeof import.meta !== 'undefined' && import.meta.env?.DEV && (
            <div className="bg-[var(--color-forest)] text-red-400 p-6 mb-8 text-left text-xs font-mono w-full max-w-3xl overflow-auto border border-[var(--color-forest-20)] shadow-2xl">
              <strong className="text-[var(--color-gold)] uppercase tracking-widest block mb-2">Error Stack Trace:</strong> 
              {this.state.error?.toString()}<br/><br/>
              <strong className="text-[var(--color-gold)] uppercase tracking-widest block mb-2">Component Stack:</strong> 
              {this.state.errorInfo?.componentStack}
            </div>
          )}

          <BtnPrimary onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}>
            Reload Library Session
          </BtnPrimary>
        </div>
      );
    }
    return this.props.children;
  }
}
