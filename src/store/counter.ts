import { signal } from "@preact/signals-react";

export const counter = signal(0);

export const increment = () => {
  counter.value += 1;
};

export const decrement = () => {
  counter.value -= 1;
};
