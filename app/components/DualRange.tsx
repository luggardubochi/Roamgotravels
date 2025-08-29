"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type DualRangeProps = {
    min?: number;
    max?: number;
    step?: number;
    minValue: number;
    maxValue: number;
    onChange: (next: { minValue: number; maxValue: number }) => void;
    minDistance?: number; // enforce a gap between thumbs (in same units as step)
    ariaLabelMin?: string;
    ariaLabelMax?: string;
};

export function DualRange({
    min = 0,
    max = 100,
    step = 1,
    minValue,
    maxValue,
    onChange,
    minDistance = 0,
    ariaLabelMin = "Minimum value",
    ariaLabelMax = "Maximum value",
}: DualRangeProps) {
    const clamp = useCallback((v: number) => Math.min(max, Math.max(min, v)), [min, max]);

    const pctMin = useMemo(
        () => ((minValue - min) / (max - min)) * 100,
        [minValue, min, max]
    );
    const pctMax = useMemo(
        () => ((maxValue - min) / (max - min)) * 100,
        [maxValue, min, max]
    );

    // Keep thumbs from crossing (respect minDistance)
    const setMin = (val: number) => {
        const next = clamp(Math.min(val, maxValue - minDistance));
        onChange({ minValue: next, maxValue });
    };
    const setMax = (val: number) => {
        const next = clamp(Math.max(val, minValue + minDistance));
        onChange({ minValue, maxValue: next });
    };

    // Keyboard support (left/right/down/up, pageUp/pageDown, home/end)
    const handleKey =
        (which: "min" | "max") =>
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                const delta =
                    e.key === "ArrowRight" || e.key === "ArrowUp"
                        ? step
                        : e.key === "ArrowLeft" || e.key === "ArrowDown"
                            ? -step
                            : e.key === "PageUp"
                                ? step * 10
                                : e.key === "PageDown"
                                    ? -step * 10
                                    : e.key === "Home"
                                        ? -Infinity
                                        : e.key === "End"
                                            ? Infinity
                                            : 0;

                if (delta === 0) return;

                e.preventDefault();
                if (which === "min") {
                    const target = delta === -Infinity ? min : delta === Infinity ? max : minValue + delta;
                    setMin(target);
                } else {
                    const target = delta === -Infinity ? min : delta === Infinity ? max : maxValue + delta;
                    setMax(target);
                }
            };

    // Prevent scrolling from moving the page while sliding on some mobile browsers
    const railRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = railRef.current;
        if (!el) return;
        const prevent = (e: WheelEvent) => el.contains(e.target as Node) && e.preventDefault();
        el.addEventListener("wheel", prevent, { passive: false });
        return () => el.removeEventListener("wheel", prevent);
    }, []);

    return (
        <div className="w-full">
            <div className="mb-2 flex items-center justify-center text-sm text-gray-600">
                <span className="font-medium text-gray-800 text-center">
                    {minValue} – {maxValue}
                </span>
            </div>

            <div ref={railRef} className="relative h-8 select-none">
                {/* Track */}
                <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gray-200" />

                {/* Filled range */}
                <div
                    className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-blue-500"
                    style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
                />

                {/* Min input (thumb) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    aria-label={ariaLabelMin}
                    onChange={(e) => setMin(Number(e.target.value))}
                    onKeyDown={handleKey("min")}
                    className="pointer-events-auto absolute left-0 top-0 h-8 w-full appearance-none bg-transparent"
                />
                {/* Max input (thumb) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    aria-label={ariaLabelMax}
                    onChange={(e) => setMax(Number(e.target.value))}
                    onKeyDown={handleKey("max")}
                    className="pointer-events-auto absolute left-0 top-0 h-8 w-full appearance-none bg-transparent"
                />

                {/* Thumb styling (for both inputs) */}
                <style jsx>{`
          input[type="range"]::-webkit-slider-runnable-track {
            background: transparent;
            height: 2rem;
          }
          input[type="range"]::-moz-range-track {
            background: transparent;
            height: 2rem;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 9999px;
            background: white;
            border: 2px solid #3b82f6; /* Tailwind blue-500 */
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            margin-top: -9px; /* center on 2rem track area */
            position: relative;
            z-index: 10;
          }
          input[type="range"]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 9999px;
            background: white;
            border: 2px solid #3b82f6;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            position: relative;
            z-index: 10;
          }
          input[type="range"] {
            outline: none;
          }
        `}</style>
            </div>
        </div>
    );
}
