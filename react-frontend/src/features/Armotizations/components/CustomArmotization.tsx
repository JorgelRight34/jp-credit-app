import useGenerateArmotization from "../hooks/useGenerateArmotization";
import ArmotizationDataTable from "./ArmotizationDataTable";
import ArmotizationForm from "./ArmotizationForm";

interface CustomArmotizationProps {
  setQuery: (query: string) => void;
}

const CustomArmotization = ({ setQuery }: CustomArmotizationProps) => {
  const { armotization, handleOnChange, handleOnSubmit, form } =
    useGenerateArmotization();

  return (
    <>
      <ArmotizationForm
        handleOnChange={handleOnChange}
        onSubmit={(e) => {
          setQuery(
            Object.keys(form)
              .map((k) => `${k}=${form[k as keyof typeof form]}`)
              .join("&")
          );
          handleOnSubmit(e);
        }}
      />
      <div>
        <ArmotizationDataTable armotization={armotization || []} />
      </div>
    </>
  );
};

export default CustomArmotization;
