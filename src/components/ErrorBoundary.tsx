import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let displayMessage = "Something went wrong.";
      try {
        const errInfo = JSON.parse(this.state.error?.message || "");
        if (errInfo.error && errInfo.error.includes("insufficient permissions")) {
          displayMessage = "You don't have permission to perform this action.";
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-soft-lavender dark:bg-black flex items-center justify-center p-6 text-center transition-colors duration-500">
          <div className="max-w-md w-full bg-white dark:bg-[#111111] rounded-[40px] p-10 shadow-2xl border-2 border-slate-100 dark:border-white/5">
            <h2 className="text-3xl font-black mb-4 text-red-500 italic uppercase tracking-widest">Oops!</h2>
            <p className="text-slate-500 dark:text-gray-400 mb-8 italic font-medium leading-relaxed">{displayMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-dark-lavender text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-dark-lavender/20 uppercase tracking-widest hover:opacity-90 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
