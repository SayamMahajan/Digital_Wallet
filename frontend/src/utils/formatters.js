export const formatCurrency = (amount, currency = '₹') => {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  
  return `${currency}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatUPI = (upi) => {
  if (!upi) return '';
  
  // Mask middle part of UPI for privacy
  const [username, domain] = upi.split('@');
  if (username.length <= 4) return upi;
  
  const maskedUsername = username.substring(0, 2) + 
    '*'.repeat(username.length - 4) + 
    username.substring(username.length - 2);
  
  return `${maskedUsername}@${domain}`;
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

export const formatTransactionType = (transaction, userUPI) => {
  if (!transaction || !userUPI) return 'Unknown';
  
  const { sender_upi_id, receiver_upi_id } = transaction;
  
  if (sender_upi_id === userUPI && receiver_upi_id === userUPI) {
    return 'Deposit';
  } else if (sender_upi_id === userUPI) {
    return 'Debit';
  } else if (receiver_upi_id === userUPI) {
    return 'Credit';
  }
  
  return 'Unknown';
};