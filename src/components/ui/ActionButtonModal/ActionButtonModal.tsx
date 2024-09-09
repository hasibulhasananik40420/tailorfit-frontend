/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import {
  TIndividualOrder,
  useDeleteIndividualOrderMutation,
} from "../../../redux/api/individualOrderApi";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDeleteCompanyOrderMutation } from "../../../redux/api/companyOrderApi";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import PDFGenerator from "../../../utils/PDF";
import { FiCopy } from "react-icons/fi";

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: string;
  order?: TIndividualOrder;
}

const ActionButtonModal = ({
  isOpen,
  setIsOpen,
  id,
  order,
}: UserModalProps) => {
  const [deleteIndividualOrder] = useDeleteIndividualOrderMutation();
  const [deleteCompanyOrder] = useDeleteCompanyOrderMutation();
  const componentRef = useRef<HTMLDivElement>(null);

  const singleOrder = order;

  const handleDelete = async (id: string) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this item?",
        imageUrl:
          "https://res.cloudinary.com/diam8ogqq/image/upload/v1724340374/warning_ckqqz8.png",
        imageWidth: 48,
        imageHeight: 48,
        imageAlt: "Custom icon",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "swal2-confirm-btn",
          cancelButton: "swal2-cancel-btn",
        },
      });

      // If the user confirmed, proceed with deletion
      if (result.isConfirmed) {
        const res = await deleteIndividualOrder(id).unwrap();

        if (res?.success) {
          Swal.fire({
            icon: "success",
            title: res?.message,
            showConfirmButton: false,
            timer: 2000,
          });
          setIsOpen(false);
        }
      }
    } catch (err) {
      // console.log(err);
      const error = err as { data: { message: string } };

      Swal.fire({
        icon: "error",
        title: error?.data?.message,
      });
    }
  };
  const handleDeleteCompanyOrder = async (id: string) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this item?",
        imageUrl:
          "https://res.cloudinary.com/diam8ogqq/image/upload/v1724340374/warning_ckqqz8.png",
        imageWidth: 48,
        imageHeight: 48,
        imageAlt: "Custom icon",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "swal2-confirm-btn",
          cancelButton: "swal2-cancel-btn",
        },
      });

      // If the user confirmed, proceed with deletion
      if (result.isConfirmed) {
        const res = await deleteCompanyOrder(id).unwrap();

        if (res?.success) {
          Swal.fire({
            icon: "success",
            title: res?.message,
            showConfirmButton: false,
            timer: 2000,
          });
          setIsOpen(false);
        }
      }
    } catch (err) {
      // console.log(err);
      const error = err as { data: { message: string } };

      Swal.fire({
        icon: "error",
        title: error?.data?.message,
      });
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div>
      {isOpen && (
        <div
          ref={modalRef}
          style={{ boxShadow: "0px 0px 5px 0px rgba(200, 201, 209, 0.65)" }}
          className=" bg-white w-[126px] rounded-[5px] p-[10px]"
        >
          <div>
            {order?.industry ? (
              <Link
                to={`/admin/order-detail/${id}`}
                className="bg-white w-full text-switchColor text-[16px] font-Poppins font-medium leading-5 flex items-center gap-1 h-10 pl-2 rounded hover:bg-activeDhcolor duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M11.6465 3.36544L12.9117 2.09944C13.1755 1.83568 13.5332 1.6875 13.9062 1.6875C14.2793 1.6875 14.637 1.83568 14.9008 2.09944C15.1645 2.36319 15.3127 2.72093 15.3127 3.09394C15.3127 3.46695 15.1645 3.82468 14.9008 4.08844L6.9365 12.0527C6.53999 12.449 6.05102 12.7402 5.51375 12.9002L3.5 13.5002L4.1 11.4864C4.25996 10.9492 4.55123 10.4602 4.9475 10.0637L11.6465 3.36544ZM11.6465 3.36544L13.625 5.34394M12.5 10.5002V14.0627C12.5 14.5102 12.3222 14.9395 12.0057 15.2559C11.6893 15.5724 11.2601 15.7502 10.8125 15.7502H2.9375C2.48995 15.7502 2.06072 15.5724 1.74426 15.2559C1.42779 14.9395 1.25 14.5102 1.25 14.0627V6.18769C1.25 5.74013 1.42779 5.31091 1.74426 4.99444C2.06072 4.67798 2.48995 4.50019 2.9375 4.50019H6.5"
                    stroke="black"
                    stroke-opacity="0.6"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                View
              </Link>
            ) : (
              <Link
                to={`/admin/order-details/${id}`}
                className="bg-white w-[106px] text-switchColor text-[16px] font-Poppins font-medium leading-5 flex items-center gap-1 h-10 pl-2 rounded hover:bg-activeDhcolor duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M11.6465 3.36544L12.9117 2.09944C13.1755 1.83568 13.5332 1.6875 13.9062 1.6875C14.2793 1.6875 14.637 1.83568 14.9008 2.09944C15.1645 2.36319 15.3127 2.72093 15.3127 3.09394C15.3127 3.46695 15.1645 3.82468 14.9008 4.08844L6.9365 12.0527C6.53999 12.449 6.05102 12.7402 5.51375 12.9002L3.5 13.5002L4.1 11.4864C4.25996 10.9492 4.55123 10.4602 4.9475 10.0637L11.6465 3.36544ZM11.6465 3.36544L13.625 5.34394M12.5 10.5002V14.0627C12.5 14.5102 12.3222 14.9395 12.0057 15.2559C11.6893 15.5724 11.2601 15.7502 10.8125 15.7502H2.9375C2.48995 15.7502 2.06072 15.5724 1.74426 15.2559C1.42779 14.9395 1.25 14.5102 1.25 14.0627V6.18769C1.25 5.74013 1.42779 5.31091 1.74426 4.99444C2.06072 4.67798 2.48995 4.50019 2.9375 4.50019H6.5"
                    stroke="black"
                    stroke-opacity="0.6"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                View
              </Link>
            )}

            {order?.industry ? (
              <Link
                to={`/admin/duplicate-industry-order/${id}`}
                className="bg-white w-[106px] text-switchColor text-[16px] font-Poppins font-medium leading-5 flex items-center gap-1 h-10 pl-2 rounded hover:bg-activeDhcolor duration-300"
              >
                <FiCopy className="2xl:size-5 size-4 text-secondaryColor" />
                Duplicate
              </Link>
            ) : (
              <Link
                to={`/admin/duplicate-order/${id}`}
                className="bg-white w-[106px] text-switchColor text-[16px] font-Poppins font-medium leading-5 flex items-center gap-1 h-10 pl-2 rounded hover:bg-activeDhcolor duration-300"
              >
                <FiCopy className="2xl:size-5 size-4 text-secondaryColor" />
                Duplicate
              </Link>
            )}

            {order?.industry ? (
              <Link
                to={`/admin/edit-industry-order/${id}`}
                className="bg-white w-[106px] text-switchColor text-[16px] font-Poppins font-medium leading-5 flex items-center gap-1 h-10 pl-2 rounded hover:bg-activeDhcolor duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M11.6465 3.36544L12.9117 2.09944C13.1755 1.83568 13.5332 1.6875 13.9062 1.6875C14.2793 1.6875 14.637 1.83568 14.9008 2.09944C15.1645 2.36319 15.3127 2.72093 15.3127 3.09394C15.3127 3.46695 15.1645 3.82468 14.9008 4.08844L6.9365 12.0527C6.53999 12.449 6.05102 12.7402 5.51375 12.9002L3.5 13.5002L4.1 11.4864C4.25996 10.9492 4.55123 10.4602 4.9475 10.0637L11.6465 3.36544ZM11.6465 3.36544L13.625 5.34394M12.5 10.5002V14.0627C12.5 14.5102 12.3222 14.9395 12.0057 15.2559C11.6893 15.5724 11.2601 15.7502 10.8125 15.7502H2.9375C2.48995 15.7502 2.06072 15.5724 1.74426 15.2559C1.42779 14.9395 1.25 14.5102 1.25 14.0627V6.18769C1.25 5.74013 1.42779 5.31091 1.74426 4.99444C2.06072 4.67798 2.48995 4.50019 2.9375 4.50019H6.5"
                    stroke="black"
                    stroke-opacity="0.6"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Edit
              </Link>
            ) : (
              <Link
                to={`/admin/edit-order/${id}`}
                className="bg-white w-[106px] text-switchColor text-[16px] font-Poppins font-medium leading-5 flex items-center gap-1 h-10 pl-2 rounded hover:bg-activeDhcolor duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M11.6465 3.36544L12.9117 2.09944C13.1755 1.83568 13.5332 1.6875 13.9062 1.6875C14.2793 1.6875 14.637 1.83568 14.9008 2.09944C15.1645 2.36319 15.3127 2.72093 15.3127 3.09394C15.3127 3.46695 15.1645 3.82468 14.9008 4.08844L6.9365 12.0527C6.53999 12.449 6.05102 12.7402 5.51375 12.9002L3.5 13.5002L4.1 11.4864C4.25996 10.9492 4.55123 10.4602 4.9475 10.0637L11.6465 3.36544ZM11.6465 3.36544L13.625 5.34394M12.5 10.5002V14.0627C12.5 14.5102 12.3222 14.9395 12.0057 15.2559C11.6893 15.5724 11.2601 15.7502 10.8125 15.7502H2.9375C2.48995 15.7502 2.06072 15.5724 1.74426 15.2559C1.42779 14.9395 1.25 14.5102 1.25 14.0627V6.18769C1.25 5.74013 1.42779 5.31091 1.74426 4.99444C2.06072 4.67798 2.48995 4.50019 2.9375 4.50019H6.5"
                    stroke="black"
                    stroke-opacity="0.6"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Edit
              </Link>
            )}

            {order?.industry ? (
              <button className="bg-white w-[106px] text-[#F00C89] text-[16px] font-Poppins font-medium leading-5 flex items-center pl-2 rounded gap-1 h-10 hover:bg-activeDhcolor duration-300">
                <FaPrint />
                <>
                  <ReactToPrint
                    trigger={() => <p>Print</p>}
                    content={() => componentRef.current}
                  />
                </>
              </button>
            ) : (
              <button className="bg-white w-[106px] text-[#F00C89] text-[16px] font-Poppins font-medium leading-5 flex items-center pl-2 rounded gap-1 h-10 hover:bg-activeDhcolor duration-300">
                <FaPrint />
                <>
                  <ReactToPrint
                    trigger={() => <p>Print</p>}
                    content={() => componentRef.current}
                  />
                </>
              </button>
            )}
            <PDFGenerator
              singleOrder={singleOrder as TIndividualOrder}
              componentRef={componentRef}
            ></PDFGenerator>

            {order?.industry ? (
              <button
                onClick={() => handleDeleteCompanyOrder(id)}
                className="bg-white w-[106px] text-[#F00C89] text-[16px] font-Poppins font-medium leading-5 flex items-center pl-2 rounded gap-1 h-10 hover:bg-activeDhcolor duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M11.055 6.75039L10.7955 13.5004M7.2045 13.5004L6.945 6.75039M14.421 4.34289C14.6775 4.38189 14.9325 4.42314 15.1875 4.46739M14.421 4.34289L13.62 14.7551C13.5873 15.1791 13.3958 15.575 13.0838 15.8638C12.7717 16.1526 12.3622 16.313 11.937 16.3129H6.063C5.63782 16.313 5.22827 16.1526 4.91623 15.8638C4.6042 15.575 4.41269 15.1791 4.38 14.7551L3.579 4.34289M14.421 4.34289C13.5554 4.21203 12.6853 4.11271 11.8125 4.04514M3.579 4.34289C3.3225 4.38114 3.0675 4.42239 2.8125 4.46664M3.579 4.34289C4.4446 4.21203 5.31468 4.11271 6.1875 4.04514M11.8125 4.04514V3.35814C11.8125 2.47314 11.13 1.73514 10.245 1.70739C9.41521 1.68087 8.58479 1.68087 7.755 1.70739C6.87 1.73514 6.1875 2.47389 6.1875 3.35814V4.04514M11.8125 4.04514C9.94029 3.90045 8.05971 3.90045 6.1875 4.04514"
                    stroke="#F00C89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Delete
              </button>
            ) : (
              <button
                onClick={() => handleDelete(id)}
                className="bg-white w-[106px] text-[#F00C89] text-[16px] font-Poppins font-medium leading-5 flex items-center pl-2 rounded gap-1 h-10 hover:bg-activeDhcolor duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M11.055 6.75039L10.7955 13.5004M7.2045 13.5004L6.945 6.75039M14.421 4.34289C14.6775 4.38189 14.9325 4.42314 15.1875 4.46739M14.421 4.34289L13.62 14.7551C13.5873 15.1791 13.3958 15.575 13.0838 15.8638C12.7717 16.1526 12.3622 16.313 11.937 16.3129H6.063C5.63782 16.313 5.22827 16.1526 4.91623 15.8638C4.6042 15.575 4.41269 15.1791 4.38 14.7551L3.579 4.34289M14.421 4.34289C13.5554 4.21203 12.6853 4.11271 11.8125 4.04514M3.579 4.34289C3.3225 4.38114 3.0675 4.42239 2.8125 4.46664M3.579 4.34289C4.4446 4.21203 5.31468 4.11271 6.1875 4.04514M11.8125 4.04514V3.35814C11.8125 2.47314 11.13 1.73514 10.245 1.70739C9.41521 1.68087 8.58479 1.68087 7.755 1.70739C6.87 1.73514 6.1875 2.47389 6.1875 3.35814V4.04514M11.8125 4.04514C9.94029 3.90045 8.05971 3.90045 6.1875 4.04514"
                    stroke="#F00C89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtonModal;
