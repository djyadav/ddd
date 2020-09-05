import React, { useContext, useState } from "react";
import style from "./_column.module.scss";
import { Card, CardBody, CardTitle, Input, FormGroup } from "reactstrap";
import { AppContext } from "AppContext";
import { If } from "utils";

const Title = ({ title, addTask, column: columnId }) => {
  const { column } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setErrors({});
    setValue(e.target.value);
  };
  const cancel = () => {
    setEditing(false);
  };
  const update = () => {
    if (!value || value.length < 2) {
      setErrors({
        title: "Min 2 characters required.",
      });
      return;
    }
    column.update(columnId, { title: value });
    setEditing(false);
  };
  return (
    <CardTitle className={`${style.title} `}>
      <If test={!editing}>
        <span>{title}</span>
      </If>
      <If test={editing}>
        <FormGroup>
          <Input
            className={style.input}
            type="text"
            value={value}
            onChange={handleChange}
            invalid={errors.title}
          />
          <div className="invalid-feedback">{errors.title}</div>
        </FormGroup>
      </If>
      <div className={style.actions}>
        <If test={editing}>
          <i
            className={`fas fa-check ${style.edit}`}
            color="primary"
            onClick={update}
          />
          <i
            className={`fas fa-times ${style.edit}`}
            color="primary"
            onClick={cancel}
          />
        </If>
        <If test={!editing}>
          <i
            className={`fas fa-edit ${style.edit}`}
            color="primary"
            onClick={() => {
              setEditing(true);
            }}
          />
          <i
            className={`fas fa-plus ${style.add}`}
            color="primary"
            onClick={() => {
              column.addTask({ column: columnId });
            }}
          />
        </If>
      </div>
    </CardTitle>
  );
};
export default Title;
