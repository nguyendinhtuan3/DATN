import { Input } from "antd";

const SearchBar = ({ placeholder, onSearch }) => (
  <Input.Search
    placeholder={placeholder}
    onSearch={onSearch}
    enterButton
    allowClear
    size="large"
  />
);

export default SearchBar;
