import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const CartContext = createContext(null);

const emptyCustomerDetails = () => ({
  firstName: "",
  lastName: "",
  phone: "",
  idNumber: "",
});

export function CartProvider({ children }) {
  const [medications, setMedications] = useState([]);
  const [customerDetails, setCustomerDetailsState] = useState(emptyCustomerDetails);

  const addMedication = useCallback((medication) => {
    setMedications((prev) => {
      const existing = prev.findIndex((m) => m.code === medication.code);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = {
          ...next[existing],
          quantity: next[existing].quantity + 1,
        };
        return next;
      }
      return [...prev, { ...medication, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((index, newQuantity) => {
    setMedications((prev) => {
      const next = [...prev];
      if (index >= 0 && index < next.length) {
        next[index] = { ...next[index], quantity: Math.max(1, newQuantity) };
      }
      return next;
    });
  }, []);

  const removeMedication = useCallback((index) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const setMedicationsDirect = useCallback((meds) => {
    setMedications(meds || []);
  }, []);

  const setCustomerDetails = useCallback((partial) => {
    setCustomerDetailsState((prev) => ({ ...prev, ...partial }));
  }, []);

  const clearCart = useCallback(() => {
    setMedications([]);
    setCustomerDetailsState(emptyCustomerDetails());
  }, []);

  const totalPrice = medications.reduce(
    (sum, m) => sum + (m.price || 0) * (m.quantity || 0),
    0
  );

  const value = {
    medications,
    setMedications: setMedicationsDirect,
    addMedication,
    updateQuantity,
    removeMedication,
    clearCart,
    customerDetails,
    setCustomerDetails,
    totalItems: medications.reduce((sum, m) => sum + m.quantity, 0),
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
