import { User } from "../../../models/user";
import "../profiles.css";
import ProfileInfoTable from "./ProfileInfoTable";
import ProfileCard from "./ProfileCard";
import LoanInfo from "../../Loans/components/LoanInfo";
import useProfileStats from "../hooks/useProfileStats";
import useFetchLoan from "../../Loans/hooks/useFetchLoan";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

interface ProfileInfoProps {
  profile: User;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const { stats, isLoading } = useProfileStats(profile.username);
  const { loan: lastLoan, fetchLoan } = useFetchLoan();

  useEffect(() => {
    if (!stats?.lastLoan) return;
    fetchLoan(stats.lastLoan.id);
  }, [stats]);

  if (isLoading) return <></>;

  return (
    <>
      <div className="row mx-0">
        <div className="col-lg-4 d-flex align-items-center">
          <div>
            <ProfileCard profile={profile} />
          </div>
        </div>
        <div className="col-lg-8 d-flex align-items-center">
          <ProfileInfoTable stats={stats} profile={profile} />
        </div>
      </div>

      {lastLoan && (
        <div className="row mx-0 mt-5">
          <div className="row mx-0">
            <h4>
              Último Préstamo{" "}
              <Link
                className="ms-2 text-accent-secondary"
                to={`/loans/${lastLoan.id}`}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </h4>
          </div>
          <LoanInfo loan={lastLoan} />
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
