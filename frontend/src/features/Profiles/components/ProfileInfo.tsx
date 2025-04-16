import { User } from "../../../models/user";
import "../profiles.css";
import ProfileInfoTable from "./ProfileInfoTable";
import ProfileCard from "./ProfileCard";
import LoanInfo from "../../Loans/components/LoanInfo";
import useProfileStats from "../hooks/useProfileStats";
import useFetchLoan from "../../Loans/hooks/useFetchLoan";
import { useEffect } from "react";
import { getFirstAndLastName } from "../../../utils/utils";

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
        <div className="col-lg-4 d-flex align-items-center">
          <div>
            <h3 className="text-center mb-3">{getFirstAndLastName(profile)}</h3>
            <ProfileCard profile={profile} />
          </div>
        </div>
        <div className="col-lg-8">
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
