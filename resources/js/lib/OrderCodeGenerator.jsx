import React from 'react';

/**
 * TicketCode component for generating and displaying formatted ticket codes
 * 
 * @param {Object} props - Component props
 * @param {string|Date} props.createdAt - Creation date of the ticket (Date object or ISO string)
 * @param {string|number} props.ticketId - ID of the ticket
 * @param {string} [props.className] - Optional CSS class name for styling
 * @returns {JSX.Element} Formatted ticket code
 */
const OrderCodeGenerator = ({ createdAt, ticketId, className = "" }) => {
  // Format function for generating ticket code
  const formatTicketCode = (date, id) => {
    try {
      // Handle date value (could be string or Date object)
      const ticketDate = date instanceof Date ? date : new Date(date);
      
      // Extract date components
      const year = ticketDate.getFullYear().toString().slice(-2);
      const month = String(ticketDate.getMonth() + 1).padStart(2, '0');
      const day = String(ticketDate.getDate()).padStart(2, '0');
      
      // Return formatted code
      return `#QKTS-${year}C${id}`;
    } catch (error) {
      console.error("Error generating ticket code:", error);
      return "#QKTS-ERROR";
    }
  };

  return (
    <span className={className}>
      {formatTicketCode(createdAt, ticketId)}
    </span>
  );
};

export default OrderCodeGenerator;