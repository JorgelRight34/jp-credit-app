import { useMemo } from "react";
import { Loan } from "../../../models/loan";
import { toCurrency, toFormattedDate } from "../../../utils/utils";

interface TransactionFormDetailsProps {
  loan: Loan;
  amount: number;
}

const TransactionFormDetails = ({
  amount,
  loan,
}: TransactionFormDetailsProps) => {
  const totalDeliquency = useMemo(() => {
    return loan.transactions?.reduce(
      (prev, curr) => curr.delinquency + prev,
      0
    );
  }, [loan]);
  const penaltyFee = useMemo(() => {
    return loan.transactions?.reduce((prev, curr) => curr.penaltyFee + prev, 0);
  }, [loan]);

  return (
    <>
      <h6>Detalles</h6>
      <div className="row mx-0 mb-3">
        <div className="col-lg-4">
          {/* Annual interest */}
          <div className="mb-3">
            <label className="form-label">Pago No.</label>
            <p>
              {loan.transactions?.length ? loan.transactions.length + 1 : 1}
            </p>
          </div>
          {/* Annual interest */}
          <div className="mb-3">
            <label className="form-label">Tasa de Interes</label>
            <p>{loan.annualInterestRate}</p>
          </div>
        </div>
        <div className="col-lg-4">
          {/* Payment value (cuota) */}
          <div className="mb-3">
            <label className="form-label">Cuota</label>
            <p>{toCurrency(loan.paymentValue)}</p>
          </div>
          {/* Capital */}
          <div className="mb-3">
            <label className="form-label">Tasa de Interes</label>
            <p>{amount - amount * loan.annualInterestRate}</p>
          </div>
        </div>
        <div className="col-lg-4">
          {/* Deliquency */}
          <div className="mb-3">
            <label className="form-label">Total Atraso</label>
            <p>{toCurrency(totalDeliquency)}</p>
          </div>
        </div>
      </div>
      <h6>Montos Pagados</h6>
      <div className="row mx-0">
        <div className="col-lg-4">
          {/* Capital */}
          <div className="mb-3">
            <label className="form-label">Capital</label>
            <p>{toCurrency(loan.disbursedAmount - loan.principalBalance)}</p>
          </div>
        </div>
        <div className="col-lg-4">
          {/* Last PAYMENT */}
          <div className="mb-3">
            <label className="form-label">Ultimo Pago</label>
            {loan.lastPayment ? (
              <p>{toFormattedDate(new Date(loan.lastPayment?.date))}</p>
            ) : (
              <p>---</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          {/* Interest */}
          <div className="mb-3">
            <label className="form-label">Interes</label>
            <p>{toCurrency(loan.accruedInterest)}</p>
          </div>
        </div>
        <div className="col-lg-4">
          {/* Penalty fee */}
          <div className="mb-3">
            <label className="form-label">Mora</label>
            {loan.lastPayment ? <p>{toCurrency(penaltyFee)}</p> : <p>---</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionFormDetails;
