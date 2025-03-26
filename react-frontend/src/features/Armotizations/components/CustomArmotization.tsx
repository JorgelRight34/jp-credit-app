import useGenerateArmotization from "../hooks/useGenerateArmotization";
import ArmotizationDataTable from "./ArmotizationDataTable";
import ArmotizationForm from "./ArmotizationForm";

const CustomArmotization = () => {
  const { armotization, handleOnChange, handleOnSubmit } =
    useGenerateArmotization();

  return (
    <>
      <ArmotizationForm
        handleOnChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
      <div>
        <ArmotizationDataTable armotization={armotization || []} />
      </div>
    </>
  );
};

export default CustomArmotization;
