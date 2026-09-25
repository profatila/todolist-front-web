export function formatDate(dateString) {
  if (!dateString) return '';
  // Se já estiver no formato DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    return dateString;
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

export function formatDateTime(dateTimeString) {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return dateTimeString;

  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDueDateStatus(dueDateString, status) {
  if (!dueDateString || status === 'CONCLUÍDA' || status === 'ARCHIVADA') {
    return { isOverdue: false, isToday: false, label: '' };
  }

  let due;
  if (/^\d{2}-\d{2}-\d{4}$/.test(dueDateString)) {
    const [day, month, year] = dueDateString.split('-').map(Number);
    due = new Date(year, month - 1, day);
  } else {
    due = new Date(dueDateString);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { isOverdue: true, isToday: false, label: `Atrasada por ${Math.abs(diffDays)} dia(s)` };
  }
  if (diffDays === 0) {
    return { isOverdue: false, isToday: true, label: 'Vence Hoje' };
  }
  return { isOverdue: false, isToday: false, label: `Vence em ${diffDays} dia(s)` };
}
