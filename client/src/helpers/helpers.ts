export default function formatDate(date: Date): string {
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Handle single digit dates by adding the 'st', 'nd', 'rd', or 'th' suffix
    const suffix = dayOfMonth % 10 === 1
      ? 'st'
      : dayOfMonth % 10 === 2
      ? 'nd'
      : dayOfMonth % 10 === 3
      ? 'rd'
      : 'th';
  
    return `${dayOfMonth}${suffix} ${month}, ${year}`;
  }