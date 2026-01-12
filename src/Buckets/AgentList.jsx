import React from 'react'
import Select from "react-select";


export const AgentList = ({agents,assigning,selectedLeads,handleBulkAssign}) => {
      const agentOptions = agents.map((a) => ({
            value: a.id,
            label: a.name,
            }));
    
  return (
    <div>
        <Select
                          options={agentOptions}
                          placeholder={assigning ? "Assigning..." : "Assign selected to"}
                          isDisabled={assigning || selectedLeads.length === 0}
                          onChange={(selected) => handleBulkAssign(selected.value)}
                          isSearchable
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              minHeight: "38px",
                              minWidth:"240px",
                              backgroundColor: "#fff6df",
                              borderColor: state.isFocused ? "#7a2530" : "rgba(91, 29, 38, 0.3)",
                              borderRadius: "6px",
                              boxShadow: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                              "&:hover": {
                                borderColor: "#7a2530",
                              },
                            }),

                            placeholder: (base) => ({
                              ...base,
                              color: "#888",
                              fontWeight: 500,
                            }),

                            singleValue: (base) => ({
                              ...base,
                              color: "#5b1d26",
                              fontWeight: 500,
                            }),

                            menu: (base) => ({
                              ...base,
                              borderRadius: "6px",
                              boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                              marginTop: "4px",
                              fontSize: "14px",
                            }),

                            option: (base, state) => ({
                              ...base,
                              padding: "10px 14px",
                              backgroundColor: state.isSelected
                                ? "#7a2530"
                                : state.isFocused
                                ? "rgba(154, 90, 42, 0.15)"
                                : "transparent",
                              color: state.isSelected ? "#fff" : "#5b1d26",
                              cursor: "pointer",
                            }),

                            indicatorSeparator: () => ({
                              display: "none",
                            }),

                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#5b1d26",
                              "&:hover": {
                                color: "#6b1f2b",
                              },
                            }),
                          }}
                        />
    </div>
  )
}
