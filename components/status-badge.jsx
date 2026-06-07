export default function StatusBadge({ status }) {
  const statusConfig = {
    Active: "status-active",
    Pending: "status-pending",
    Confirmed: "status-active",
    Completed: "status-completed",
    Cancelled: "status-cancelled",
    Paid: "status-active",
    Unpaid: "status-cancelled",
    Partial: "status-pending",
  };

  const className = statusConfig[status] || "status-pending";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}
