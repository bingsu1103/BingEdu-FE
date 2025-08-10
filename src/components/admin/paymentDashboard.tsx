import paymentService from "@/services/payment.service";
import React, { useState, useMemo, useEffect } from "react";

// Types you likely already have somewhere
interface IPayment {
  _id: string;
  userId: string;
  courseId: string;
  method: string;
  status: "paid" | "unpaid" | string;
  createdAt: string;
}

// Expected shape of paginated response
// interface PaginatedPaymentsResponse {
//   data: IPayment[];
//   total: number; // total items across all pages (server must return this)
//   page: number; // current page index (1-based)
//   limit: number; // page size
// }

const PaymentDashboard: React.FC = () => {
  // Data
  const [listPayment, setListPayment] = useState<IPayment[] | []>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Pagination state
  const [page, setPage] = useState<number>(1); // 1-based
  const [limit, setLimit] = useState<number>(10);

  // When the filter changes, reset to first page
  useEffect(() => {
    setPage(1);
  }, [filterStatus]);

  // Fetch payments (server-side pagination)
  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Adjust to your real API method & params
        // Assumes your service accepts { page, limit, status }
        // and returns { data, total, page, limit }
        const res = await paymentService.getPaymentWithPaginateAPI(
          page,
          limit,
          ""
        );
        setListPayment(res?.data?.payments || []);
        setTotal(res?.data?.total || 0);
      } catch (err) {
        console.log(err);
        setListPayment([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [page, limit, filterStatus]);

  // Client-side filtered list (not used for rendering when server-side pagination is on)
  // Kept here only in case you still need local computations
  const filteredPayments = useMemo(() => listPayment, [listPayment]);

  const totalOrders = total; // now reflects total across pages
  const totalPages = Math.max(1, Math.ceil(totalOrders / limit));
  //   const startItem = totalOrders === 0 ? 0 : (page - 1) * limit + 1;
  //   const endItem = Math.min(page * limit, totalOrders);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    if (status === "paid") return `${baseClasses} bg-green-100 text-green-800`;
    if (status === "unpaid") return `${baseClasses} bg-red-100 text-red-800`;
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground mb-4">
            Payment Management
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-background border border-gray-200 rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Total Orders
              </div>
              <div className="text-lg font-semibold text-foreground">
                {totalOrders}
              </div>
            </div>
          </div>

          {/* Filter + Page size */}
          <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs border border-gray-300 rounded px-3 py-2 bg-background text-foreground w-full md:w-auto"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>

            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground">Rows per page:</span>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="text-xs border border-gray-300 rounded px-2 py-2 bg-background text-foreground"
              >
                {[10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payment Table */}
        <div className="bg-background border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-background border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 font-medium text-foreground">
                    Payment ID
                  </th>
                  <th className="text-left p-3 font-medium text-foreground">
                    User ID
                  </th>
                  <th className="text-left p-3 font-medium text-foreground">
                    Course ID
                  </th>
                  <th className="text-left p-3 font-medium text-foreground">
                    Method
                  </th>
                  <th className="text-left p-3 font-medium text-foreground">
                    Status
                  </th>
                  <th className="text-left p-3 font-medium text-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-500">
                      Loading payments...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : filteredPayments.length > 0 ? (
                  filteredPayments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className={
                        index % 2 === 0 ? "bg-background" : "bg-background/90"
                      }
                    >
                      <td className="p-3 text-foreground font-mono">
                        {payment._id}
                      </td>
                      <td className="p-3 text-foreground font-mono">
                        {payment.userId}
                      </td>
                      <td className="p-3 text-foreground font-mono">
                        {payment.courseId}
                      </td>
                      <td className="p-3 text-foreground">{payment.method}</td>
                      <td className="p-3">
                        <span className={getStatusBadge(payment.status)}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{payment.createdAt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-gray-500 text-sm"
                    >
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 border-t border-gray-200">
            <div className="text-xs text-foreground">
              Page {page} of {totalPages}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(1)}
                disabled={!canPrev}
                className={`px-3 py-2 text-xs rounded border ${
                  canPrev
                    ? "bg-background cursor-pointer text-foreground"
                    : "bg-background text-foreground cursor-not-allowed"
                }`}
                aria-label="First page"
              >
                « First
              </button>

              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!canPrev}
                className={`px-3 py-2 text-xs rounded border ${
                  canPrev
                    ? "bg-background cursor-pointer text-foreground"
                    : "bg-background text-foreground cursor-not-allowed"
                }`}
                aria-label="Previous page"
              >
                ‹ Prev
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={!canNext}
                className={`px-3 py-2 text-xs rounded border ${
                  canNext
                    ? "bg-background cursor-pointer text-foreground"
                    : "bg-background text-foreground cursor-not-allowed"
                }`}
                aria-label="Next page"
              >
                Next ›
              </button>

              <button
                onClick={() => setPage(totalPages)}
                disabled={!canNext}
                className={`px-3 py-2 text-xs rounded border ${
                  canNext
                    ? "bg-background cursor-pointer text-foreground"
                    : "text-foreground cursor-not-allowed bg-background"
                }`}
                aria-label="Last page"
              >
                Last »
              </button>
            </div>

            {/* Quick jump to page */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Go to page:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={(e) => {
                  const next = Number(e.target.value || 1);
                  if (!Number.isNaN(next))
                    setPage(Math.min(Math.max(1, next), totalPages));
                }}
                className="w-20 text-xs border border-gray-300 rounded px-2 py-2 bg-background text-foreground"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;
