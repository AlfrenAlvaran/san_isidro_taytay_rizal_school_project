import { createContext, useContext, useState, useEffect } from "react";

// ─── Context ────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

// ─── Mock user store (replace with real API / Firebase / etc.) ───────────────
const MOCK_USERS = [
  {
    id: "u1",
    firstName: "Maria",
    lastName: "Santos",
    email: "maria@example.com",
    password: "password123",
    verified: true,
  },
  {
    id: "u2",
    firstName: "Juan",
    lastName: "dela Cruz",
    email: "juan@example.com",
    password: "password123",
    verified: false,
  },
];

// ─── Mock request store ──────────────────────────────────────────────────────
const MOCK_REQUESTS = {
  u1: [
    {
      id: "r1",
      documentType: "Barangay Clearance",
      trackingNo: "BRG-2024-00041",
      date: "Jun 20, 2024",
      status: "Ready for Pickup",
    },
    {
      id: "r2",
      documentType: "Certificate of Residency",
      trackingNo: "BRG-2024-00038",
      date: "Jun 15, 2024",
      status: "Released",
    },
  ],
  u2: [],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function generateTrackingNo() {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 90000) + 10000);
  return `BRG-${year}-${num}`;
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("brgy_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [requests, setRequests] = useState(() => {
    if (!user) return [];
    return MOCK_REQUESTS[user.id] ?? [];
  });

  const [error, setError] = useState(null);

  // Sync requests when user changes
  useEffect(() => {
    if (user) {
      setRequests(MOCK_REQUESTS[user.id] ?? []);
      localStorage.setItem("brgy_user", JSON.stringify(user));
    } else {
      setRequests([]);
      localStorage.removeItem("brgy_user");
    }
  }, [user]);

  // ── Auth ──────────────────────────────────────────────────────────────────

  /**
   * Sign in with email + password.
   * Returns { success: true } or { success: false, message: string }
   */
  function login(email, password) {
    setError(null);
    const found = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );
    if (!found) {
      const msg = "Incorrect email or password.";
      setError(msg);
      return { success: false, message: msg };
    }
    const { password: _pw, ...safeUser } = found; // never store raw password
    setUser(safeUser);
    return { success: true };
  }

  /**
   * Register a new account.
   * Returns { success: true } or { success: false, message: string }
   */
  function register({ firstName, lastName, email, password }) {
    setError(null);
    const exists = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      const msg = "An account with that email already exists.";
      setError(msg);
      return { success: false, message: msg };
    }
    const newUser = {
      id: `u${Date.now()}`,
      firstName,
      lastName,
      email,
      password,
      verified: false,
    };
    MOCK_USERS.push(newUser);
    MOCK_REQUESTS[newUser.id] = [];
    const { password: _pw, ...safeUser } = newUser;
    setUser(safeUser);
    return { success: true };
  }

  function logout() {
    setUser(null);
    setError(null);
  }

  // ── Requests ──────────────────────────────────────────────────────────────

  /**
   * Submit a new document request for the current user.
   * @param {string} documentType - human-readable label (e.g. "Barangay Clearance")
   * @returns {{ success: boolean, trackingNo?: string, message?: string }}
   */
  function submitRequest(documentType) {
    if (!user) return { success: false, message: "Not logged in." };

    const newRequest = {
      id: `r${Date.now()}`,
      documentType,
      trackingNo: generateTrackingNo(),
      date: formatDate(),
      status: "Pending",
    };

    // Update local state
    setRequests((prev) => [newRequest, ...prev]);

    // Persist to mock store
    if (!MOCK_REQUESTS[user.id]) MOCK_REQUESTS[user.id] = [];
    MOCK_REQUESTS[user.id].unshift(newRequest);

    return { success: true, trackingNo: newRequest.trackingNo };
  }

  /**
   * Update the status of a request (admin use).
   * @param {string} requestId
   * @param {string} status - "Pending" | "Processing" | "Ready for Pickup" | "Released"
   */
  function updateRequestStatus(requestId, status) {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
    if (MOCK_REQUESTS[user?.id]) {
      const idx = MOCK_REQUESTS[user.id].findIndex((r) => r.id === requestId);
      if (idx !== -1) MOCK_REQUESTS[user.id][idx].status = status;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <AppContext.Provider
      value={{
        // state
        user,
        requests,
        error,
        // auth
        login,
        register,
        logout,
        // requests
        submitRequest,
        updateRequestStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}