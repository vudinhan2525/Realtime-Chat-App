export default function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const currentDate = new Date();

  // Check if the date is today
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    // Format time in HH:mm AM/PM format
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  }

  // Check if the date is in the current week
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(
    Math.abs((date.getTime() - currentDate.getTime()) / oneDay)
  );
  if (diffDays < 7) {
    // Format date in abbreviated day format (e.g., Tue, Wed, etc.)
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  // Format date in abbreviated month and year format (e.g., Jan 2023)
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
