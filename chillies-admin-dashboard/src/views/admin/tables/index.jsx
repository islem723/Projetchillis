import { useEffect, useState, useRef } from "react";

import CheckTable from "./components/CheckTable";

import { API_URL, MENU_URL, CATEGORY_URL } from "../../../utils/consts";
import { Select } from "@chakra-ui/react";
import InputField from "../../../components/fields/InputField";

import { columnsDataCheck } from "./variables/columnsData";

import { useToast } from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";

const Tables = () => {
  const [mealsGrouped, setMealsGrouped] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen2, onOpen2, onClose2 } = useDisclosure();
  const [selectedMeal, setSelectedMeal] = useState({});

  const [editForm, setEditForm] = useState({
    platname: "",
    price: 0,
  });

  const [addForm, setAddForm] = useState({
    platname: "",
    price: 0,
  });

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const toast = useToast();
  useEffect(() => {
    setEditForm(selectedMeal);
  }, [selectedMeal]);

  useEffect(function () {
    async function callApi() {
      const resp = await fetch(MENU_URL);
      if (resp.status === 200) {
        const json = await resp.json();
        console.log(json);
        setMealsGrouped(json);
      }
    }
    callApi();
  }, []);

  useEffect(function () {
    async function callApi() {
      const resp = await fetch(CATEGORY_URL);
      if (resp.status === 200) {
        const json = await resp.json();
        console.log(json);
        setCategories(json);
      }
    }
    callApi();
  }, []);

  async function SendAddMeal() {}

  function onRowClick(meal) {
    console.log(meal);
    setSelectedMeal(meal);
    onOpen();
  }

  function onAddClick() {
    onOpen2();
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      await onImageUpload(file);
    }
  }

  async function onImageUpload(file) {
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);

    console.table(selectedMeal);

    const resp = await fetch(
      `${MENU_URL}/updatePlateImage/${selectedMeal._id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const body = await resp.json();

    toast({
      title: "Meal Update Photo",
      description: resp.status === 200 ? body.message : body.error,
      status: resp.status === 200 ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  }

  async function SendDelete() {
    const resp = await fetch(`${MENU_URL}/deleteAllplats`, {
      method: "DELETE",
    });
    const body = await resp.json();
    toast({
      title: "Meal Delete",
      description: resp.status === 200 ? body.message : body.error,
      status: resp.status === 200 ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  }

  async function SendDeleteAll() {
    const resp = await fetch(`${MENU_URL}/deleteplat/${selectedMeal._id}`, {
      method: "DELETE",
    });
    const body = await resp.json();
    toast({
      title: "Meal Delete",
      description: resp.status === 200 ? body.message : body.error,
      status: resp.status === 200 ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  }

  function triggerImageSelection() {
    fileInputRef.current.click();
  }

  function triggerImageSelection2() {
    fileInputRef2.current.click();
  }

  async function SendEdit() {
    const resp = await fetch(`${MENU_URL}/updatePlat/${selectedMeal._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platname: editForm.platname,
        price: editForm.price,
      }),
    });
    const body = await resp.json();
    toast({
      title: "Meal Update",
      description: resp.status === 200 ? body.message : body.error,
      status: resp.status === 200 ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  }

  function onFieldChange(e) {
    console.log(e);
    const { name, value } = e.target;
    setEditForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function onFieldChange2(e) {
    console.log(e);
    const { name, value } = e.target;
    setAddForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <div>
      <div className="mt-5 h-full w-full md:grid-cols-2">
        <CheckTable
          onAddClick={() => onAddClick()}
          onDeleteAllClick={SendDeleteAll}
          columnsData={columnsDataCheck}
          tableData={mealsGrouped}
          onRowClicked={(row) => onRowClick(row)}
        />
      </div>
      {/* Modal component */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedMeal.platname}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div
              onClick={triggerImageSelection}
              className="flex items-center justify-center"
            >
              <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
                <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                  <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                  <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                    Upload Files
                  </h4>
                  <p className="mt-2 text-sm font-medium text-gray-600">
                    PNG, JPG and GIF files are allowed
                  </p>
                </button>
              </div>
              <img
                style={{ height: "150px", objectFit: "contain" }}
                src={`${API_URL}/img/${selectedMeal.image}`}
                className="mb-3 w-full rounded-xl 3xl:h-full 3xl:w-full"
                alt=""
              />
            </div>
            <InputField
              label="Plate Name"
              id="plateName"
              fieldName="platname"
              placeholder="New meal name..."
              value={editForm.platname || ""}
              onChange={(e) => onFieldChange(e)}
            />
            <InputField
              label="Plate Price"
              id="platePrice"
              type="number"
              fieldName="price"
              placeholder="New price..."
              value={editForm.price || 0}
              onChange={(e) => onFieldChange(e)}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="mx-5" colorScheme="green" onClick={SendEdit}>
              Submit
            </Button>
            <Button colorScheme="red" onClick={SendDelete}>
              Delete
            </Button>
            <Button className="mx-5" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Meal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="file"
              ref={fileInputRef2}
              style={{ display: "none" }}
              onChange={setSelectedImage}
            />
            <div
              onClick={triggerImageSelection2}
              className="flex items-center justify-center"
            >
              <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
                <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                  <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                  <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                    Upload Files
                  </h4>
                  <p className="mt-2 text-sm font-medium text-gray-600">
                    PNG, JPG and GIF files are allowed
                  </p>
                </button>
              </div>
              <img
                style={{ height: "150px", objectFit: "contain" }}
                src={`${API_URL}/img/${selectedMeal.image}`}
                className="mb-3 w-full rounded-xl 3xl:h-full 3xl:w-full"
                alt=""
              />
            </div>
            <Select
              onChange={(e) => {
                setSelectedCat(e);
              }}
              placeholder="Select option"
            >
              {categories.map((cat) => (
                <option key={cat._id} value="option1">
                  {cat.categoryName}
                </option>
              ))}
            </Select>
            <InputField
              label="Plate Name"
              id="plateName"
              fieldName="platname"
              placeholder="New meal name..."
              value={addForm.platname || ""}
              onChange={(e) => onFieldChange2(e)}
            />
            <InputField
              label="Plate Price"
              id="platePrice"
              type="number"
              fieldName="price"
              placeholder="New price..."
              value={addForm.price || 0}
              onChange={(e) => onFieldChange2(e)}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="mx-5" colorScheme="green" onClick={SendAddMeal}>
              Submit
            </Button>
            <Button className="mx-5" onClick={onClose2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Tables;
