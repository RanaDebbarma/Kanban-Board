import styles from "./SettingColorPicker.module.css";

export default function SettingColorPicker({
  value,
  label,
  changeId,
  onChange,
}) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={changeId}>{label} :</label>
      <input
        type="color"
        id={changeId}
        value={value}
        onChange={(e) => onChange(changeId, e.target.value)}
      />
    </div>
  );
}
