import { User } from "../../../models/user";
import "../profiles.css";
import ProfileInfoTable from "./ProfileInfoTable";
import ProfileCard from "./ProfileCard";
import LoanInfo from "../../Loans/components/LoanInfo";
import useProfileStats from "../hooks/useProfileStats";
import useFetchLoan from "../../Loans/hooks/useFetchLoan";
import { useEffect } from "react";

interface ProfileInfoProps {
  profile: User;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const { stats } = useProfileStats(profile.username);
  const { loan: lastLoan, fetchLoan } = useFetchLoan();

  useEffect(() => {
    if (!stats?.lastLoan) return;
    fetchLoan(stats.lastLoan.id);
  }, [stats]);

  return (
    <>
      <div className="row mx-0">
        <div className="col-lg-3 d-flex align-items-center">
          <ProfileCard profile={profile} />
        </div>
        <div className="col-lg-9 d-flex align-items-center">
          <ProfileInfoTable stats={stats} profile={profile} />
        </div>
      </div>

      {lastLoan && (
        <div className="row mx-0 mt-5">
          <h4>Último Préstamo</h4>
          <LoanInfo loan={lastLoan} />
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
