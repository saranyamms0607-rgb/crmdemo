import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import "../styles/Assigned.css";
import axios from "axios";
import { FiMenu, FiX, FiRotateCcw } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Unassigned } from "./Unassigned";

export const Assigned = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /* ================= STATUS FROM URL ================= */
  const statusFromUrl = searchParams.get("status") || "assigned";
  const [selectedStatus, setSelectedStatus] = useState(statusFromUrl);

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    name: "",
    company: "",
    region: "",
  });

  /* ================= SYNC URL → STATE ================= */
  useEffect(() => {
    setSelectedStatus(statusFromUrl);
    setPage(1);
  }, [statusFromUrl]);

  /* ================= SYNC STATE → URL ================= */
  useEffect(() => {
    setSearchParams({ status: selectedStatus });
  }, [selectedStatus, setSearchParams]);

  /* ================= FETCH LEADS ================= */
  useEffect(() => {
    let ignore = false;

    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8000/crm/leads/", {
          params: { status: selectedStatus, page },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        if (!ignore) {
          setLeads(res.data?.results?.data || []);
          setTotalCount(res.data.count || 0);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchLeads();
    return () => (ignore = true);
  }, [selectedStatus, page, navigate]);

  /* ================= SEARCH & FILTER ================= */
  const normalize = (value) =>
    String(value || "").trim().toLowerCase();

  const filteredLeads = leads.filter((lead) => {
    const searchMatch =
      !search ||
      normalize(lead.lead_name).includes(normalize(search)) ||
      normalize(lead.lead_company).includes(normalize(search)) ||
      normalize(lead.lead_region).includes(normalize(search));

    const nameMatch =
      !filters.name ||
      normalize(lead.lead_name).includes(normalize(filters.name));

    const companyMatch =
      !filters.company ||
      normalize(lead.lead_company).includes(normalize(filters.company));

    const regionMatch =
      !filters.region ||
      normalize(lead.lead_region).includes(normalize(filters.region));

    return searchMatch && nameMatch && companyMatch && regionMatch;
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleReset = () => {
    setSearch("");
    setFilters({ name: "", company: "", region: "" });
  };

  /* ================= UI ================= */
  return (
    <section className="assigned-leads">
      {/* Hamburger */}
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </aside>

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="main">
        <div className="content">
          {/* Header */}
          <div className="table-header">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name, company or region..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="clear-button"
                onClick={() => setSearch("")}
              >
                <FiX size={20}/>
              </button>
            </div>

            <div className="filter">
              <button onClick={() => setShowFilter(true)} className="search-filter">Filter</button>
              <button onClick={handleReset} className="reset-button">
                <FiRotateCcw size={20}/>
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="leads">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3">Loading...</td></tr>
              ) : filteredLeads.length === 0 ? (
                <tr><td colSpan="3">No data found</td></tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.lead_name}</td>
                    <td>{lead.lead_company || "-"}</td>
                    <td>{lead.lead_region || "-"}</td>
                    {selectedStatus == "unassigned" && <td><Unassigned/></td>}
                  </tr>
                ))

              )}
            </tbody>
          </table>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(1)}>First</button>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
              <button disabled={page === totalPages} onClick={() => setPage(totalPages)}>Last</button>
            </div>
          )}
        </div>
      </main>

      {/* Filter Modal */}
        {showFilter && (
  <>
    <div
      className="filter-overlay"
      onClick={() => setShowFilter(false)}
    />

    <div className="filter-panel">
      <h3>Filter Leads</h3>

      <div className="filter-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) =>
            setFilters({ ...filters, name: e.target.value })
          }
        />
      </div>

      <div className="filter-group">
        <label>Company</label>
        <input
          type="text"
          placeholder="Filter by company"
          value={filters.company}
          onChange={(e) =>
            setFilters({ ...filters, company: e.target.value })
          }
        />
      </div>

      <div className="filter-group">
        <label>Region</label>
        <input
          type="text"
          placeholder="Filter by region"
          value={filters.region}
          onChange={(e) =>
            setFilters({ ...filters, region: e.target.value })
          }
        />
      </div>

      <div className="filter-actions">
        <button
          className="clear-btn"
          onClick={() =>
            setFilters({ name: "", company: "", region: "" })
          }
        >
          Clear
        </button>

        <button
          className="apply-btn"
          onClick={() => setShowFilter(false)}
        >
          Apply
        </button>
      </div>
    </div>
  </>
)}
    </section>
  );
};
