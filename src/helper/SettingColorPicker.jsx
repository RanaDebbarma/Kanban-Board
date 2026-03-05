import styles from "./SettingColorPicker.module.css";

export default function SettingColorPicker({
  label,
  value,
  changeId,
  onChange,
}) {
  return (
    <div className={styles.colorWrapper}>
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
