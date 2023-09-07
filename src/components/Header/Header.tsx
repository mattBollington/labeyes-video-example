import styles from "./Header.module.css";
import { HeaderProps } from "../../types/types";

const Header: React.FC<HeaderProps> = ({
  title = "Reach Industries Frontend Assessment",
}) => {
  return (
    <header className={styles.headerContainer} data-testid="header">
      <h1 className={styles.headerTitle}>{title}</h1>
    </header>
  );
};

export default Header;
