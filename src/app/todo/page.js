"use client";
import styles from "@/app/styles/todo.module.css";
import { Comic_Neue } from "next/font/google";
import { FaCheck, FaEdit, FaTrash, FaTimes, FaUndo } from "react-icons/fa";
import { useRouter } from "next/navigation";
const inter = Comic_Neue({ subsets: ["latin"], weight: "700" });
import { useState, useEffect } from "react";
import { url_prefix } from "@/app/utils/constants";
import { Tooltip } from "@heroui/tooltip";

const ToDo = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [all_items, all_setItems] = useState([]);
  const [text, setNewItem] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [date, setDate] = useState("");
  const [user, userData] = useState([]);

  useEffect(() => {
    router.push('/validateuser')
    const u_d = localStorage.getItem("user_data");
    if (!u_d) {
      router.push("/login");
    } else {
      const json_ud = JSON.parse(u_d);
      userData(json_ud);
      // fetchItems(json_ud[0])
    }
  }, [router]);

  const filterList = async (val) => {
    if (!val.length) {
      return setItems(all_items);
    }
    const arr = items.filter((i) => i.text.toLowerCase().includes(val.toLowerCase()));
    setItems(arr);
  };

  const fetchItems = async (u) => {
    try {
      const response = await fetch(
        `${url_prefix}/todo/getTodo?userId=` +
        u.userId +
        "&date_id=" +
        new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-")
      );
      const data = await response.json();
      setItems(data.data.sort((a, b) => b.isActive - a.isActive));
      all_setItems(data.data.sort((a, b) => b.isActive - a.isActive));
      console.log(data.data)
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreate = async () => {
    if (!text) return;
    const userId = user[0].userId;
    try {
      const response = await fetch(`${url_prefix}/todo/createtodo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId }),
      });
      if (response.ok) {
        setNewItem("");
        setDate(new Intl.DateTimeFormat("en-CA").format(new Date()));
        fetchItems(user[0]);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleUpdate = async (id) => {
    if (!editingValue) return;
    try {
      const response = await fetch(
        `${url_prefix}/todo/updateTodo/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editingValue }),
        }
      );
      if (response.ok) {
        setEditingItem(null);
        setEditingValue("");
        fetchItems(user[0]);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${url_prefix}/todo/deleteTodo/${id}`,
        {
          method: "POST",
        }
      );
      if (response.ok) fetchItems(user[0]);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const marksAsCheck = async (item) => {
    const { _id, isActive } = item;
    try {
      const response = await fetch(`${url_prefix}/todo/isComplete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, isActive }),
      });
      if (response.ok) {
        setItems([]);
        fetchItems(user[0]);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-CA").format(new Date());
    setDate(today);
  }, []);

  useEffect(() => {
    if (!date) return;
    fetchItems(user[0]);
  }, [date]);

  return (
    <>
      <div className={styles.main_div}>
        <div className={styles.upper_div}>
          <span className={`${styles.welcome_txt} ${inter.className}`}>
            {user[0] && user[0].username ? (
              <>
                {" "}
                Welcome{" "}
                <span className={styles.welcome_span}>{user[0].username}</span>
              </>
            ) : (
              <> Welcome</>
            )}
          </span>
          <div className={styles.middle_block}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => filterList(e.target.value)}
            />
            <span className={styles.date_filter_parent}>
              <label
                className={`${styles.date_filter_label} ${inter.className}`}
              >
                Filter By Date
              </label>
              <input
                className={styles.date_filter_field}
                type="date"
                name="date"
                max={new Intl.DateTimeFormat("en-CA").format(new Date())}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </span>
          </div>
        </div>
        <br />
        <br />
        <hr style={{ margin: "5px 20px" }} />
        <br />
        <br />

        {/* Create Item */}
        <div className={styles.newTodo}>
          <input
            type="text"
            placeholder=" Add New item"
            value={text}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <Tooltip content="Add Item" color={'primary'} showArrow={true}>
            <FaCheck
              onClick={handleCreate}
              className={styles.icons_design}
              size={20}
            />
          </Tooltip>
          {/* <button className={styles.button_add_todo} onClick={handleCreate}>
            Add
          </button> */}
        </div>
        <br />
        <br />

        {/* List Items */}
        <div className={styles.todoBlock}>
          {items.length ? (
            <>
              {items.map((item) => (
                <div key={item._id} className={styles.todoItem}>
                  {editingItem === item._id ? (
                    <>
                      <div className={styles.edit_div}>
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                        />
                        <div className={styles.edit_icons}>
                          <Tooltip content="Save Changes" color={'primary'} showArrow={true}>
                            <FaCheck
                              onClick={() => handleUpdate(item._id)}
                              className={styles.icons_design}
                              size={20}
                            />
                          </Tooltip>
                          <Tooltip content="Discard" color={'primary'} showArrow={true}>
                            <FaTimes
                              onClick={() => setEditingItem(null)}
                              className={styles.icons_design}
                              size={20}
                            />
                          </Tooltip>
                          {/* <button onClick={() => handleUpdate(item._id)}>
                        Save
                      </button> */}
                          {/* <button onClick={() => setEditingItem(null)}>
                        Cancel
                      </button> */}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className={item.isActive ? styles.todoText : styles.todoText_inactive}>{item.text}</span>

                      <div className={styles.form_container}>
                        {/* <button onClick={() => { setEditingItem(item._id); setEditingValue(item.text);}}>
                    Edit
                  </button> */}

                        {/* <button onClick={() => handleDelete(item._id)}>Delete</button> */}
                        {item.isActive ?
                          <>
                            <Tooltip content="Mark As Complete" color={'primary'} showArrow={true}>
                              <FaCheck
                                className={styles.icons_design}
                                size={20}
                                onClick={() => marksAsCheck(item)}
                              />
                            </Tooltip>
                          </>
                          :
                          <>
                            <Tooltip content="Make Active Again" color={'primary'} showArrow={true}>
                              <FaUndo
                                className={styles.icons_design}
                                size={20}
                                onClick={() => marksAsCheck(item)}
                              />
                            </Tooltip>
                          </>

                        }
                        <Tooltip content="Edit Item" color={'primary'} showArrow={true}>
                          <FaEdit
                            className={styles.icons_design}
                            size={20}
                            color="brown"
                            onClick={() => {
                              setEditingItem(item._id);
                              setEditingValue(item.text);
                            }}
                          />
                        </Tooltip>
                        <Tooltip content="Delete Item" color={'primary'} showArrow={true}>
                          <FaTrash
                            className={styles.icons_design}
                            size={20}
                            color="brown"
                            onClick={() => handleDelete(item._id)}
                          />
                        </Tooltip>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          ) : (
            <h2>No Results</h2>
          )}
        </div>
      </div>
    </>
  );
};
export default ToDo;
