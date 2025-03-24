import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useNewLoan from "../hooks/useNewLoan";

const schema = z.object({
  approvedAmount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Must be greater than 0 " }),
  disbursedAmount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Must be greater than 0" }),
  annualInterest: z.string().transform((val) => Number(val)),
  numberOfPayments: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Must be greater than 0" }),
  paymentFrequency: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Must be greater than 0" }),
  startDate: z.string(),
  deliveryDate: z.string(),
  loanOfficerId: z.string(),
  clientId: z.string(),
});

const LoanForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [onSubmit] = useNewLoan();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mx-0 pt-3">
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Approved Amount</label>
            <input
              {...register("approvedAmount")}
              name="approvedAmount"
              type="number"
              className="form-control"
              placeholder="Enter approved amount"
            />
            {errors.approvedAmount && (
              <p className="text-danger">{errors.approvedAmount.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Disbursed Amount</label>
            <input
              {...register("disbursedAmount")}
              name="disbursedAmount"
              type="number"
              className="form-control"
              placeholder="Enter disbursed amount"
            />
            {errors.disbursedAmount && (
              <p className="text-danger">{errors.disbursedAmount.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Annual Interest Rate (%)</label>
            <input
              {...register("annualInterest")}
              name="annualInterest"
              type="number"
              className="form-control"
              step="0.01"
              placeholder="Enter interest rate"
            />
            {errors.annualInterest && (
              <p className="text-danger">{errors.annualInterest.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Number of Payments</label>
            <input
              {...register("numberOfPayments")}
              name="numberOfPayments"
              type="number"
              className="form-control"
              placeholder="Enter number of payments"
            />
            {errors.numberOfPayments && (
              <p className="text-danger">{errors.numberOfPayments.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Payment Frequency</label>
            <input
              {...register("paymentFrequency")}
              name="paymentFrequency"
              type="number"
              className="form-control"
              placeholder="Enter payment frequency"
            />
            {errors.paymentFrequency && (
              <p className="text-danger">{errors.paymentFrequency.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              {...register("startDate")}
              name="startDate"
              type="date"
              className="form-control"
            />
            {errors.startDate && (
              <p className="text-danger">{errors.startDate.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Delivery Date</label>
            <input
              {...register("deliveryDate")}
              name="deliveryDate"
              type="date"
              className="form-control"
            />
            {errors.deliveryDate && (
              <p className="text-danger">{errors.deliveryDate.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Client id</label>
            <input
              {...register("clientId")}
              name="clientId"
              type="number"
              className="form-control"
            />
            {errors.clientId && (
              <p className="text-danger">{errors.clientId.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Loan officer id</label>
            <input
              {...register("loanOfficerId")}
              name="loanOfficerId"
              type="number"
              className="form-control"
            />
            {errors.loanOfficerId && (
              <p className="text-danger">{errors.loanOfficerId.message}</p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-accent w-100">
          Submit Loan
        </button>
      </div>
    </form>
  );
};

export default LoanForm;
