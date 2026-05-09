import { useState } from "react";

/**
 * Hook that manages the state of a disclosure component, such as a
 * modal or a tooltip.
 *
 * @param {boolean} initialValue `true` if open on mount, `false` otherwise.
 *                                Default is `false`.
 * @returns {Object} An object containing properties and methods to
 *                   manage the disclosure state. The properties include:
 * @property {Boolean} isOpen - A boolean value indicating whether the
 *                              disclosure component is currently open or closed.
 * @property {Function} open - A function that sets the `isOpen` value to `true`.
 * @property {Function} close - A function that sets the `isOpen` value to `false`.
 * @property {Function} toggle - A function that toggles the `isOpen` value
 *                                between `true` and `false`.
 */

type DisclosureAction = () => void;

export const useDisclosure = (initialValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(initialValue || false);

  const close: DisclosureAction = () => {
    setIsOpen(false);
  };

  const open: DisclosureAction = () => {
    setIsOpen(true);
  };

  const toggle: DisclosureAction = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, close, open, toggle, setIsOpen };
};