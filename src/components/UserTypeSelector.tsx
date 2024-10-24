import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
  loading,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    if (onClickHandler) {
      onClickHandler(type);
    }
  };

  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
      disabled={loading}
    >
      <SelectTrigger className="w-fit border-none bg-transparent text-blue-100 outline-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-none bg-black outline-none">
        <SelectItem
          value="viewer"
          className="cursor-pointer bg-dark-200 text-blue-100 focus:bg-dark-300 hover:bg-dark-300"
        >
          can view
        </SelectItem>
        <SelectItem
          value="editor"
          className="cursor-pointer bg-dark-200 text-blue-100 focus:bg-dark-300 hover:bg-dark-300 "
        >
          can edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
