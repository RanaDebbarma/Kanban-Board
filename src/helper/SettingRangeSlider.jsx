import styles from "./SettingRangeSlider.module.css";

export default function SettingRangeSlider({
  label,
  value,
  changeId,
  type,
  onChange,
}) {
  return (
    <div className={styles.effectWrapper}>
      <span>{label}{" "}:</span>
      <div className={styles.effectCompartment}>
        {type === "alpha" &&
          <>
            <span>{value}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={value}
              onChange={(e) => onChange(changeId, Number(e.target.value))}
            />
          </>
        }
        {type === "thickness" &&
          <>
            <span>{value}</span>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={value}
              onChange={(e) => onChange(changeId, e.target.value)}
            />
          </>
        }
        {type === "blur" &&
          <>
            <span>{value}</span>
            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={value}
              onChange={(e) => onChange(changeId, e.target.value)}
            />
          </>
        }
      </div>
    </div>
  );
}
