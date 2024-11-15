/* eslint-disable react/prop-types */
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { supabase } from "../../../utils/supabase";
import { Fragment, useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { AppContext } from "../../components/SidebarLayout";

export function SearchComponent({
  selectedColumns,
  setSelectedColumns,
  searchText,
  setSearchText,
  setApplyfilter,
  // total,
  language,
  setLanguage
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Handle click on an autocomplete suggestion
  
  const OpenModel = () => {
    setIsOpen(true);
  };
  const handleClear = () =>{
    setSearchText('');
    setSelectedColumns({});
    setApplyfilter(prev=>!prev)
  };
  const [options, setOptions] = useState({
    year: [],
    district: [],
    volume: [],
  });
  const searchby = [
    {
      name: "District",
      column: "district",
    },
    {
      name: "Year",
      column: "year",
    },
    {
      name: "Volume",
      column: "volume",
    }
  ]
  
  useEffect(() => {
    console.log("working");
    const fetchOptions = async () => {
      try {
        const promises = searchby.map(({column}) =>
          supabase.from("karnataka_itihasa_records").select(column)
        );
        // setOptions(newOptions);
        const results = await Promise.all(promises);
        const newOptions = {};
        searchby.forEach(({column}, index) => {
          newOptions[column] = [
            ...new Set(
              results[index].data
                .map((item) => item[column])
                .sort()
                .filter(Boolean)
            ),
          ];
        });
        setOptions(newOptions);
      } catch (error) {
        console.error("Error fetching options from Supabase:", error);
      }
    };
    fetchOptions();
  }, []);
  const handleSearchTextChange = (e, column) => {
    const { value } = e.target;
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: { ...prev[column], searchText: value },
    }));
    if(value !==''){
      setApplyfilter(prev=>!prev)
    }
  
    
  };
  return (
    <div className="">
      <DialogModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        setApplyfilter={setApplyfilter}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="2xl:container 2xl:mx-auto bg-gray-50">
        <div className=" md:py-6 lg:px-14 md:px-6 py-4 px-4">
          <div className=" flex justify-between items-center">
            <div>
              <div className="w-full flex gap-4 items-center">
                              {searchby.map((searchindex) => (
                                <div key={searchindex.column} className="flex w-full">
                                  {/* <input
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 mr-2"
                                    type="checkbox"
                                    id={searchindex.column}
                                    name={searchindex.column}
                                    checked={selectedColumns[searchindex.column]?.ischecked}
                                    defaultChecked={
                                      selectedColumns[searchindex.column]?.ischecked
                                    }
                                  /> */}
                                  <div className="inline-block">
                                    
                                    <label
                                      className="mr-2 text-md leading-3 font-normal text-gray-800"
                                      htmlFor={searchindex.column}
                                    >
                                     Search by {searchindex.name}
                                    </label>
                                    
                                        <div>
                                            <select 
                                              className="mt-2  p-1 border w-48 border-gray-300 rounded"
                                              id={searchText.column}
                                              value={
                                                !selectedColumns[searchindex.column]?.searchText?'':selectedColumns[searchindex.column]?.searchText
                                              }
                                              placeholder={`Select  ${searchindex.name}`}
                                              onChange={(e) =>
                                                handleSearchTextChange(
                                                  e,
                                                  searchindex.column
                                                )
                                              }
                                            >
                                              {!selectedColumns[searchindex.column]?.searchText &&<option value="">Select {searchindex.name}</option>}
                                              {options[searchindex.column].map(
                                                (option) => (
                                                  <option key={option} value={option}>
                                                    {option}
                                                  </option>
                                                )
                                              )}
                                            </select>
              
                                        </div>
                                  </div>
                                </div>
                              ))}
              </div>
            </div>
            {/* <div>
              <h2 className="pb-4 lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">Articles</h2>
              <p className=" text-sm leading-3 text-gray-600 font-normal mb-2">
                {total}
              </p>
            </div> */}
            <button
              onClick={OpenModel}
              className=" ml-auto cursor-pointer sm:flex hidden hover:bg-gray-700  focus:ring focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800  text-base leading-4 font-normal text-white justify-center items-center "
            >
              <svg
                className=" mr-2"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 4V8"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 12V20"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 4V14"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18V20"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 4V5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 9V20"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Advanced Search
            </button>
            {(searchText || Object.keys(selectedColumns)?.length > 0) &&<button onClick={handleClear} className="cursor-pointer ml-4 flex hover:bg-red-700  focus:ring focus:ring-offset-2 focus:ring-red-800 py-4 px-6 bg-red-800  text-base leading-4 font-normal text-white justify-center items-center">
              Clear
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>}
          </div>
          {/* <p className=" text-xl leading-5 text-gray-600 font-medium">{total}</p> */}
          {/* Filters Button (Small Screen) */}
          <button
            onClick={OpenModel}
            className=" cursor-pointer mt-6  sm:hidden hover:bg-gray-700  focus:ring focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center "
          >
            <svg
              className=" mr-2"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 4V8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 4V14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 4V5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Advanced Search
          </button>
        </div>
      </div>
      <style>
        {`
            .checkbox:checked + .check-icon {
             display: flex;
            }
            `}
      </style>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line react/prop-types
function DialogModel({
  isOpen,
  setIsOpen,
  selectedColumns,
  setSelectedColumns,
  setApplyfilter,
}) {
  function closeModal() {
    setIsOpen(false);
  }
  const [language, setLanguage] = useState("english");
  const kannada = [
    {
      name: "Author Name",
      column: "author_in_kannada",
    },
    {
      name: "Dynasty",
      column: "dynasty_in_kannada",
    },
    {
      name: "District",
      column: "district_in_kannada",
    },
    
    {
      name: "Subject",
      column: "subject_in_kannada",
    },
    {
      name: "Subject 2",
      column: "subject_2_in_kannada",
    },
  ]
  const english =  [
    {
      name: "Author Name",
      column: "authorname_in_english",
    },
    {
      name: "Dynasty",
      column: "dynasty",
    },
    
    {
      name: "Subject",
      column: "subject",
    },
    
    {
      name: "Subject 2",
      column: "subject_2",
    },
    {
      name: "Time Period",
      column: "time_period",
    },
    {
      name: "Taluk",
      column: "taluk",
    },
    // {
    //   name: "Description",
    //   column: "description",
    // },
  ];
  const [searchIndexs, setSearchIndexs] = useState([]);
  useEffect(()=>{
    setSelectedColumns({})
    if(language==='kannada'){
      setSearchIndexs(kannada);
    }else{
      setSearchIndexs(english);
    }
  },[language])
  const [options, setOptions] = useState({
    year: [],
    district: [],
    subject: [],
    dynasty: [],
    authorname_in_english: [],
  });
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    // Update the selected columns state based on the checkbox selection
    setSelectedColumns((prev) => {
      if (checked) {
        return { ...prev, [id]: { ischecked: true , searchText: selectcolumns.includes(id)?options[id][0]:'' } };
      } else {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      }
    });
   
  };
  const selectcolumns = [
    "year",
    "district",
    "subject",
    "subject_2",
    "dynasty",
    "authorname_in_english",
    "district_in_kannada",
    "subject_in_kannada",
    "subject_2_in_kannada",
    "author_in_kannada",
    "dynasty_in_kannada",
    "taluk",
    "time_period",
  ];
  useEffect(() => {
    console.log("working");
    const fetchOptions = async () => {
      try {
        const promises = selectcolumns.map((column) =>
          supabase.from("karnataka_itihasa_records").select(column)
        );
        // setOptions(newOptions);
        const results = await Promise.all(promises);
        const newOptions = {};
        selectcolumns.forEach((column, index) => {
          newOptions[column] = [
            ...new Set(
              results[index].data
                .map((item) => item[column])
                .sort()
                .filter(Boolean)
            ),
          ];
        });
        setOptions(newOptions);
      } catch (error) {
        console.error("Error fetching options from Supabase:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleSearchTextChange = (e, column) => {
    const { value } = e.target;
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: { ...prev[column], searchText: value },
    }));
  };
  const handleapplyfilter = () => {
    setApplyfilter((prev) => !prev);
    closeModal();
    // setTimeout(setSelectedColumns([]), 1000);
  };
  const tabs = [{title:"Kannada",value: "kannada"}, {title:"English",value: "english"}]
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg py-2 font-medium capitalize leading-6 text-gray-900"
                >
                  {language?`Advanced Search In ${language}`:"Select Language"}
                </Dialog.Title>
                <Tab.Group selectedIndex={language==="kannada"?0:1}>
                  <Tab.List className="flex space-x-1 mt-4 rounded-xl bg-gray-900/20 p-1">
                    {tabs.map((category)=><Tab
                      key={category.title}
                      onClick={()=>setLanguage(category.value)}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                          'ring-white/60 ring-offset-2 ring-offset-gray-800 focus:outline-none focus:ring-2',
                          selected
                            ? 'bg-white text-gray-700 shadow'
                            : 'text-black-100 hover:bg-white/[0.12]  '
                        )
                      }
                    >
                      {category.title}
                    </Tab>)}

                  </Tab.List>
                </Tab.Group>
                
                <div className="">
                  <div className="my-6">
                    <div className="p-4 flex flex-col col-span-3 space-y-8 lg:justify-start lg:items-start md:justify-start md:items-center">
                      <div className=" flex flex-col space-y-8 justify-start items-start ">
                        {/* <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">Search By</p> */}
                        <div className="grid grid-cols-3 w-full gap-8">
                          {searchIndexs.map((searchindex) => (
                            <div key={searchindex.column} className="flex w-full">
                              <input
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 mr-2"
                                type="checkbox"
                                id={searchindex.column}
                                name={searchindex.column}
                                defaultChecked={
                                  selectedColumns[searchindex.column]?.ischecked
                                }
                              />
                              <div className="inline-bl ock">
                                {" "}
                                <label
                                  className="mr-2 text-sm leading-3 font-normal text-gray-600"
                                  htmlFor={searchindex.column}
                                >
                                  {searchindex.name}
                                </label>{" "}
                                {selectedColumns[searchindex.column] &&
                                  selectedColumns[searchindex.column]
                                    .ischecked && (
                                    <div>
                                      {selectcolumns.includes(
                                        searchindex.column
                                      ) ? (
                                        <select
                                          className="mt-2 -ml-4 p-1 border w-48 border-gray-300 rounded"
                                          value={
                                            selectedColumns[searchindex.column]
                                              .searchText?selectedColumns[searchindex.column]
                                              .searchText:''
                                          }
                                          placeholder={`Select  ${searchindex.name}`}
                                          onChange={(e) =>
                                            handleSearchTextChange(
                                              e,
                                              searchindex.column
                                            )
                                          }
                                        >
                                          {options[searchindex.column].map(
                                            (option) => (
                                              <option key={option} value={option}>
                                                {option}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      ) : (
                                        <input
                                          type="text"
                                          placeholder={`Enter ${searchindex.name}`}
                                          className="mt-2 -ml-4 p-1 border w-48 border-gray-300 rounded"
                                          value={
                                            selectedColumns[searchindex.column]
                                              .searchText
                                          }
                                          onChange={(e) =>
                                            handleSearchTextChange(
                                              e,
                                              searchindex.column
                                            )
                                          }
                                        />
                                      )}
                                    </div>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleapplyfilter}
                      className=" w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function Home() {
  const {records, setRecords, searchText, setSearchText} = useContext(AppContext)
  const [page, setPage] = useState(1);
  const [pageSize] = useState(30); // Set default page size
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [applyfilter, setApplyfilter] = useState(false);
  const [language, setLanguage] = useState("english");
  const buildQuery = async () => {
    const numericColumns = ["year", "volume"];
    let query = supabase
      .from("karnataka_itihasa_records")
      .select("*", { count: "exact" })
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (Object.keys(selectedColumns)?.length > 0) {
       Object.entries(selectedColumns).map(
        ([column, value]) => {
          if (numericColumns.includes(column) && !isNaN(value.searchText)) {
            query = query.eq(column, Number(value.searchText));
          } else {
            const escapedText =value.searchText.replace(/\s*\(.*?\)\s*/g, '%').trim();
            console.log(escapedText)
            query = query.ilike(column, `%${escapedText}%`);
          }
        }
      );
      // const orCondition = conditions.join(",");
      
    } else if (searchText) {
      query = query.textSearch("article_name", searchText, {
        type: "websearch",
      });
    }
    return query;
  };
  console.log(selectedColumns);
  const getrecords = async () => {
    const { data: records, count } = await buildQuery();
    setRecords(records);
    setTotal(count);
    setTotalPages(Math.ceil(count / pageSize));
    return records;
  };
  useEffect(() => {
    setPage(1);
    getrecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchText, applyfilter]);

  useEffect(() => { 
    getrecords(); 
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="px-20 py-10">
      <SearchComponent
        records={records}
        setSelectedColumns={setSelectedColumns}
        selectedColumns={selectedColumns}
        searchText={searchText}
        setSearchText={setSearchText}
        setApplyfilter={setApplyfilter}
        total={total}
        language={language}
        setLanguage={setLanguage}
      />
      {records ? (
        <ul role="list" className=" mt-4 grid grid-cols-3 gap-4">
          {records?.map((record) => (
            <li
              key={record.id}
              className="flex flex-col border rounded-md border-gray-300 justify-between gap-x-6 p-4"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {record.article_name}
                  </p>
                </div>
                <div className="mt-1  grid grid-cols-2 items-center gap-x-2 text-xs/5 text-gray-500">
                  <p className="truncate">ಲೇಖಕ: {record.author_in_kannada}</p>
                  <p className="truncate">
                    Author: {record.authorname_in_english}
                  </p>
                </div>
                <div className="mt-1 grid grid-cols-2 items-center gap-x-2 text-xs/5 text-gray-500">
                  <p className="truncate">ವಿಷಯ: {record.subject_in_kannada}</p>
                  <p className="truncate">Subject: {record.subject}</p>
                </div>
                <div className="mt-1  grid grid-cols-2 items-center gap-x-2 text-xs/5 text-gray-500">
                  <p className="truncate">
                    ರಾಜವಂಶ: {record.dynasty_in_kannada}
                  </p>
                  <p className="truncate">Dynasty: {record.dynasty}</p>
                </div>
                <div className="mt-1  grid grid-cols-2 items-center gap-x-2 text-xs/5 text-gray-500">
                  <p className="truncate">
                    ಜಿಲ್ಲೆ: {record.district_in_kannada}
                  </p>
                  <p className="truncate">District: {record.district}</p>
                </div>
              </div>
              <div className="flex mt-auto justify-end items-center pt-4">
                <a
                  href={record.link}
                  target="_blank"
                  className="hidden rounded-md bg-gray-200 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  View<span className="sr-only">, {record.period}</span>
                </a>
                {/* <a className="hidden rounded-md bg-gray-200 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                  Details<span className="sr-only">, {record.period}</span>
                </a> */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-gray-800 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 text-white bg-gray-800 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
