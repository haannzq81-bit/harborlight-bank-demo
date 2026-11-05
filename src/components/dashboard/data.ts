// Demo data for the Oakline Banking dashboard. All figures are fictional.

export const TODAY = new Date(Date.UTC(2026, 10, 4)); // Nov 4, 2026

export const user = {
  firstName: "Anthony",
  fullName: "Anthony Reyes",
  email: "anthony@postoakgroup.com",
  initials: "AR",
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  kind: string;
  last4: string;
};

export const accounts: Account[] = [
  { id: "credit", name: "Credit Card", balance: 12505.87, kind: "Credit", last4: "4021" },
  { id: "treasury", name: "Treasury", balance: 865000.0, kind: "T-bills · 4.31% APY", last4: "8832" },
  { id: "ops", name: "Operating", balance: 1284512.4, kind: "Checking", last4: "2210" },
  { id: "payroll", name: "Payroll", balance: 196340.12, kind: "Checking", last4: "5519" },
  { id: "reserve", name: "Reserve", balance: 72751.75, kind: "Savings", last4: "0147" },
];

export const extraAccountsCount = 2;

export const totalBalance = 2418604.27;

export type Period = "7d" | "30d" | "90d" | "365d" | "wtd" | "mtd" | "qtd" | "ytd";

export const periods: { id: Period; label: string; days: number }[] = [
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 90 days", days: 90 },
  { id: "365d", label: "Last 365 days", days: 365 },
  { id: "wtd", label: "Week to date", days: 3 },
  { id: "mtd", label: "Month to date", days: 4 },
  { id: "qtd", label: "Quarter to date", days: 35 },
  { id: "ytd", label: "Year to date", days: 308 },
];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export type BalancePoint = { date: string; label: string; balance: number };

const fmtShort = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export function balanceSeries(days: number): BalancePoint[] {
  const rand = seeded(days * 7 + 3);
  const points: BalancePoint[] = [];
  const n = Math.max(days, 2);
  const start = totalBalance * (days > 200 ? 0.62 : days > 60 ? 0.84 : 0.93);
  let value = start;
  const drift = (totalBalance - start) / n;
  const raw: number[] = [];
  for (let i = 0; i < n; i++) {
    value += drift + (rand() - 0.48) * totalBalance * (days > 60 ? 0.012 : 0.008);
    raw.push(value);
  }
  // Pin last point to the current total.
  const offset = totalBalance - (raw[raw.length - 1] ?? totalBalance);
  for (let i = 0; i < n; i++) {
    const d = new Date(TODAY.getTime() - (n - 1 - i) * 86400000);
    const adj = (raw[i] ?? 0) + offset * (i / (n - 1));
    points.push({ date: d.toISOString(), label: fmtShort.format(d), balance: Math.round(adj * 100) / 100 });
  }
  return points;
}

export function flowsFor(days: number) {
  const scale = days / 30;
  return { in: 1_812_400 * scale, out: -489_920 * scale };
}

export type Party = { name: string; amount: number; initials: string };

export type MonthMovement = {
  label: string;
  moneyIn: number;
  moneyOut: number;
  sources: Party[];
  spend: Party[];
  avgIn: number;
  avgOut: number;
};

export const months: MonthMovement[] = [
  {
    label: "Sep 2026",
    moneyIn: 588_214.6,
    moneyOut: -251_902.33,
    sources: [
      { name: "Westbrook Capital Partners", amount: 240_000, initials: "WC" },
      { name: "Harlan Logistics", amount: 132_450.2, initials: "HL" },
      { name: "Meridian Health", amount: 98_115.4, initials: "MH" },
      { name: "Stripe payouts", amount: 61_220.0, initials: "SP" },
    ],
    spend: [
      { name: "Gusto Payroll", amount: -142_380.0, initials: "GP" },
      { name: "Amazon Web Services", amount: -38_441.87, initials: "AW" },
      { name: "WeWork", amount: -24_500.0, initials: "WW" },
      { name: "Brex Travel", amount: -11_802.15, initials: "BT" },
    ],
    avgIn: 612_000,
    avgOut: -268_000,
  },
  {
    label: "Oct 2026",
    moneyIn: 642_980.11,
    moneyOut: -326_770.42,
    sources: [
      { name: "Westbrook Capital Partners", amount: 260_000, initials: "WC" },
      { name: "Meridian Health", amount: 141_200.0, initials: "MH" },
      { name: "Harlan Logistics", amount: 118_906.75, initials: "HL" },
      { name: "Stripe payouts", amount: 72_430.18, initials: "SP" },
    ],
    spend: [
      { name: "Gusto Payroll", amount: -156_910.0, initials: "GP" },
      { name: "Amazon Web Services", amount: -41_208.66, initials: "AW" },
      { name: "Cooley LLP", amount: -32_000.0, initials: "CL" },
      { name: "WeWork", amount: -24_500.0, initials: "WW" },
    ],
    avgIn: 604_000,
    avgOut: -266_000,
  },
  {
    label: "Nov 2026",
    moneyIn: 128_641.23,
    moneyOut: -74_825.1,
    sources: [
      { name: "Westbrook Capital Partners", amount: 128_500.0, initials: "WC" },
      { name: "Stripe payouts", amount: 81.23, initials: "SP" },
      { name: "Interest — Treasury", amount: 40.0, initials: "OT" },
      { name: "Meridian Health", amount: 20.0, initials: "MH" },
    ],
    spend: [
      { name: "Gusto Payroll", amount: -55_810.16, initials: "GP" },
      { name: "Amazon Web Services", amount: -12_853.4, initials: "AW" },
      { name: "Linear", amount: -3_916.0, initials: "LI" },
      { name: "Office Depot", amount: -2_245.54, initials: "OD" },
    ],
    avgIn: 604_000,
    avgOut: -266_000,
  },
];

export type Txn = {
  date: string;
  party: string;
  initials: string;
  amount: number;
  account: string;
  method: string;
  status?: "Failed" | "Pending";
  mine?: boolean;
  category: "opex" | "transfer" | "revenue" | "card";
  /** Accounting category shown on the Transactions page. */
  tag?: string;
  receipt?: boolean;
};

export const transactions: Txn[] = [
  { date: "Nov 4", party: "Westbrook Capital Partners", initials: "WC", amount: 128500, account: "Operating", method: "Incoming wire", category: "revenue", tag: "Revenue" },
  { date: "Nov 4", party: "To Payroll", initials: "→", amount: -55810.16, account: "Operating", method: "Transfer", category: "transfer" },
  { date: "Nov 4", party: "From Operating", initials: "←", amount: 55810.16, account: "Payroll", method: "Transfer", category: "transfer" },
  { date: "Nov 4", party: "Oakline Working Capital", initials: "OW", amount: -2200, account: "Operating", method: "Loan payment", category: "opex", tag: "Loan Payments" },
  { date: "Nov 4", party: "Payment from Meridian Health", initials: "MH", amount: 419, account: "Reserve", method: "Invoice payment", status: "Failed", category: "revenue" },
  { date: "Nov 3", party: "Amazon Web Services", initials: "AW", amount: -12853.4, account: "Operating", method: "Anthony R. ••6112", mine: true, category: "card", tag: "Software", receipt: true },
  { date: "Nov 3", party: "Blue Bottle Coffee", initials: "BB", amount: -63.53, account: "Credit Card", method: "Maya L. ••0332", category: "card", tag: "Business Client Meals" },
  { date: "Nov 3", party: "Linear", initials: "LI", amount: -3916, account: "Credit Card", method: "Anthony R. ••6112", mine: true, category: "opex", tag: "Software", receipt: true },
  { date: "Nov 2", party: "Office Depot", initials: "OD", amount: -2245.54, account: "Operating", method: "Jordan K. ••9914", status: "Pending", category: "opex", tag: "Office Supplies" },
  { date: "Nov 2", party: "Stripe payouts", initials: "SP", amount: 81.23, account: "Operating", method: "ACH", category: "revenue", tag: "Revenue" },
  { date: "Nov 1", party: "Treasury interest", initials: "OT", amount: 3106.42, account: "Treasury", method: "Interest", category: "revenue", tag: "Interest Income" },
  { date: "Nov 1", party: "Gusto Payroll", initials: "GP", amount: -55810.16, account: "Payroll", method: "ACH debit", category: "opex", tag: "Payroll" },
  { date: "Nov 1", party: "Delta Air Lines", initials: "DL", amount: -1284.6, account: "Credit Card", method: "Priya S. ••4471", category: "card", tag: "Travel" },
  { date: "Oct 31", party: "Marriott Houston Galleria", initials: "MA", amount: -912.44, account: "Credit Card", method: "Priya S. ••4471", category: "card", tag: "Travel - Accommodation" },
  { date: "Oct 31", party: "Harlan Logistics", initials: "HL", amount: 42150, account: "Operating", method: "ACH", category: "revenue", tag: "Revenue" },
  { date: "Oct 30", party: "Cooley LLP", initials: "CL", amount: -32000, account: "Operating", method: "Domestic wire", category: "opex", tag: "Legal" },
  { date: "Oct 30", party: "Slack", initials: "SL", amount: -1450, account: "Credit Card", method: "Anthony R. ••6112", mine: true, category: "card", tag: "Software", receipt: true },
  { date: "Oct 29", party: "WeWork", initials: "WW", amount: -24500, account: "Operating", method: "ACH debit", category: "opex", tag: "Rent" },
  { date: "Oct 29", party: "Check deposit #1042", initials: "CD", amount: 1000, account: "Reserve", method: "Check deposit", status: "Pending", category: "revenue" },
  { date: "Oct 28", party: "Figma", initials: "FI", amount: -540, account: "Credit Card", method: "Maya L. ••0332", category: "card", tag: "Software" },
];

export const txnTabs = [
  { id: "recent", label: "Recent" },
  { id: "mine", label: "My transactions" },
  { id: "in", label: "Monthly money in" },
  { id: "out", label: "Monthly money out" },
  { id: "opex", label: "Operating expenses" },
] as const;

export type TxnTab = (typeof txnTabs)[number]["id"];

export function filterTxns(tab: TxnTab): Txn[] {
  switch (tab) {
    case "mine":
      return transactions.filter((t) => t.mine);
    case "in":
      return transactions.filter((t) => t.amount > 0);
    case "out":
      return transactions.filter((t) => t.amount < 0);
    case "opex":
      return transactions.filter((t) => t.category === "opex" || t.category === "card");
    default:
      return transactions.slice(0, 10);
  }
}

// ---------- Accounts ----------

export type FullAccount = Account & { rule?: { title: string; detail: string }; group: "credit" | "deposit" };

export const allAccounts: FullAccount[] = [
  { ...accounts[0]!, group: "credit", kind: "Oakline Card", rule: { title: "Autopay from Operating", detail: "Every 22nd of the month or if <80% of limit left" } },
  { ...accounts[1]!, group: "deposit" },
  { ...accounts[2]!, group: "deposit", rule: { title: "Sweep to Treasury", detail: "Keep Operating at $1.2M, move the excess every Friday" } },
  { ...accounts[3]!, group: "deposit", rule: { title: "Top up from Operating", detail: "Before each payroll run, fund to $200K" } },
  { ...accounts[4]!, group: "deposit" },
  { id: "ap", name: "AP", balance: 0, kind: "Checking", last4: "1794", group: "deposit" },
  { id: "ar", name: "AR", balance: 0, kind: "Checking", last4: "4296", group: "deposit" },
];

export const pendingDeposits = 1000;
export const pendingTransfers = 71764.1;

export const linkedAccounts = [
  { name: "JPMorgan Chase", detail: "Business Checking ••4410", status: "Connected", balance: 48210.55 },
  { name: "Bank of America", detail: "Savings ••7731", status: "Connected", balance: 120000 },
  { name: "Frost Bank", detail: "Checking ••0925", status: "Reconnect needed", balance: null },
];

export const treasury = {
  balance: 865000,
  netYield: "4.31%",
  coverage: "18 months",
  earnings: 41280.55,
  holdings: [
    { name: "Oakline Government Money Fund", liquidity: "Same day", maturity: "—", yield: "4.18%", value: 315000 },
    { name: "U.S. Treasury Bill — 3 month", liquidity: "1–2 days", maturity: "Jan 15, 2027", yield: "4.36%", value: 250000 },
    { name: "U.S. Treasury Bill — 6 month", liquidity: "1–2 days", maturity: "Apr 22, 2027", yield: "4.29%", value: 200000 },
    { name: "U.S. Treasury Note — 1 year", liquidity: "1–2 days", maturity: "Oct 30, 2027", yield: "4.12%", value: 100000 },
  ],
};

export const financing = {
  limit: 250000,
  outstanding: 88000,
  nextPayment: { amount: 2200, date: "Nov 18" },
  apr: "9.75%",
  history: [
    { date: "Nov 4", label: "Payment", amount: -2200 },
    { date: "Oct 4", label: "Payment", amount: -2200 },
    { date: "Sep 12", label: "Draw", amount: 40000 },
    { date: "Sep 4", label: "Payment", amount: -2200 },
    { date: "Jun 2", label: "Draw", amount: 60000 },
  ],
};

// ---------- Cards ----------

export type DemoCard = {
  holder: string;
  you?: boolean;
  last4: string;
  nickname?: string;
  spent: number;
  type: "Physical" | "Virtual";
  account: string;
  status?: "Suspended" | "Frozen" | "Single-use";
};

export const cards: DemoCard[] = [
  { holder: "Anthony Reyes", you: true, last4: "6112", nickname: "Anthony's Oakline card", spent: 18219.4, type: "Physical", account: "Credit Card" },
  { holder: "Anthony Reyes", you: true, last4: "0330", nickname: "AWS billing", spent: 12853.4, type: "Virtual", account: "Credit Card" },
  { holder: "Anthony Reyes", you: true, last4: "3054", nickname: "Google Ads", spent: 1500, type: "Virtual", account: "Credit Card" },
  { holder: "Anthony Reyes", you: true, last4: "4928", nickname: "Team offsite", spent: 0, type: "Virtual", account: "Operating", status: "Single-use" },
  { holder: "Maya Lin", last4: "0332", nickname: "Office & meals", spent: 603.53, type: "Physical", account: "Credit Card" },
  { holder: "Maya Lin", last4: "7840", spent: 540, type: "Virtual", account: "Operating ••2210" },
  { holder: "Jordan Kim", last4: "9914", nickname: "Facilities", spent: 2245.54, type: "Physical", account: "Operating ••2210" },
  { holder: "Jordan Kim", last4: "6871", spent: 110, type: "Physical", account: "Operating ••2210", status: "Suspended" },
  { holder: "Priya Shah", last4: "4471", nickname: "Travel", spent: 2197.04, type: "Physical", account: "Credit Card" },
  { holder: "Priya Shah", last4: "8628", nickname: "Conference", spent: 0, type: "Virtual", account: "Credit Card", status: "Frozen" },
];

export const subscriptions = [
  { merchant: "Amazon Web Services", initials: "AW", card: "••0330", cadence: "Monthly", amount: 12853.4, next: "Dec 3" },
  { merchant: "Linear", initials: "LI", card: "••6112", cadence: "Monthly", amount: 3916, next: "Dec 3" },
  { merchant: "Slack", initials: "SL", card: "••6112", cadence: "Monthly", amount: 1450, next: "Nov 30" },
  { merchant: "Figma", initials: "FI", card: "••7840", cadence: "Monthly", amount: 540, next: "Nov 28" },
  { merchant: "Google Workspace", initials: "GW", card: "••6112", cadence: "Monthly", amount: 864, next: "Dec 1" },
  { merchant: "Notion", initials: "NO", card: "••6112", cadence: "Annual", amount: 2400, next: "Mar 14" },
];

export const creditCard = {
  balance: 12505.87,
  pending: 1245.13,
  limit: 35000,
  available: 21249,
  autopay: "Nov 9",
  statementBalance: 9812.4,
  statements: [
    { period: "Oct 2026", balance: 9812.4, due: "Nov 9", status: "Autopay scheduled" },
    { period: "Sep 2026", balance: 11204.18, due: "Oct 9", status: "Paid" },
    { period: "Aug 2026", balance: 8740.02, due: "Sep 9", status: "Paid" },
    { period: "Jul 2026", balance: 10115.66, due: "Aug 9", status: "Paid" },
  ],
};

// ---------- Tasks ----------

export type Task = { icon: "spend" | "receipt" | "category" | "invite" | "payment" | "setting" | "reimburse"; text: string; received: string; urgent?: boolean };

export const tasks: Task[] = [
  { icon: "spend", text: "Priya Shah spent $1,284.60 at Delta Air Lines. If approved, the Travel budget would be $284.60 over limit.", received: "Nov 4", urgent: true },
  { icon: "receipt", text: "Verify the address forwarding receipts to receipts@postoakgroup.com.", received: "Nov 4" },
  { icon: "receipt", text: "Maya Lin requested a receipt exception for a purchase of $603.53 at Blue Bottle Coffee.", received: "Nov 4" },
  { icon: "category", text: "Review category · $2,245.54 at Office Depot", received: "Nov 4" },
  { icon: "invite", text: "Jordan Kim requested to invite Daniel Ortiz with Bookkeeper access.", received: "Nov 3" },
  { icon: "payment", text: "$11,600.00 payment to Harris County Tax Office · Requested by Jordan K.", received: "Nov 3" },
  { icon: "payment", text: "$4,250.00 payment to Bayou Creative Studio · Requested by Maya L.", received: "Nov 3" },
  { icon: "setting", text: "Jordan Kim requested to set the daily payment limit to $50,000.00.", received: "Nov 2" },
  { icon: "setting", text: "Jordan Kim requested that sensitive changes require two admins.", received: "Nov 2" },
  { icon: "reimburse", text: "Priya Shah requested reimbursement for an expense of $375.87 at Pappas Bros. Steakhouse.", received: "Nov 1" },
];

// ---------- Team spend ----------

export const teamSpendByCategory = [
  { name: "Software", value: 74200 },
  { name: "Travel", value: 58100 },
  { name: "Office Supplies", value: 52400 },
  { name: "Client Meals", value: 31800 },
  { name: "Marketing", value: 29600 },
  { name: "Other", value: 22800 },
];

export const budgets = [
  { name: "Hardware", amount: 1000, period: "monthly", spent: 640, members: 4 },
  { name: "Team Lunch", amount: 200, period: "weekly", spent: 148.2, members: 12 },
  { name: "Travel", amount: 5000, period: "quarterly", spent: 5284.6, members: 3 },
  { name: "Software", amount: 3000, period: "monthly", spent: 2521.04, members: 2 },
];

export const policies = [
  { name: "Receipts required", rule: "Transactions over $75", applies: "All cards", active: true },
  { name: "Notes required", rule: "Transactions over $100", applies: "All cards", active: true },
  { name: "Category required", rule: "All card transactions", applies: "All cards", active: true },
  { name: "Merchant blocks", rule: "Gambling, cash advances", applies: "All cards", active: true },
  { name: "Weekend spend alert", rule: "Over $500 on Sat/Sun", applies: "Physical cards", active: true },
  { name: "Travel pre-approval", rule: "Flights and hotels", applies: "Travel budget", active: true },
  { name: "Receipt deadline", rule: "Within 7 days", applies: "All cards", active: true },
  { name: "International spend", rule: "Requires admin approval", applies: "Virtual cards", active: true },
];

export const reimbursements = [
  { who: "Priya Shah", initials: "PS", merchant: "Pappas Bros. Steakhouse", date: "Nov 1", amount: 375.87, status: "Needs review" },
  { who: "Maya Lin", initials: "ML", merchant: "Uber", date: "Oct 30", amount: 64.2, status: "Needs review" },
  { who: "Jordan Kim", initials: "JK", merchant: "Home Depot", date: "Oct 29", amount: 212.45, status: "Needs review" },
  { who: "Daniel Ortiz", initials: "DO", merchant: "Mileage — 142 mi", date: "Oct 27", amount: 95.14, status: "Needs review" },
  { who: "Priya Shah", initials: "PS", merchant: "Parking — IAH", date: "Oct 24", amount: 226.86, status: "Needs review" },
  { who: "Maya Lin", initials: "ML", merchant: "Staples", date: "Oct 12", amount: 724.75, status: "Paid" },
];

export const teamMembers = [
  { name: "Anthony Reyes", initials: "AR", you: true, role: "Admin", cards: 4, spent: 34572.8, missing: "All set" },
  { name: "Maya Lin", initials: "ML", role: "Employee", cards: 2, spent: 1143.53, missing: "1 receipt" },
  { name: "Jordan Kim", initials: "JK", role: "Admin", cards: 2, spent: 2355.54, missing: "1 category" },
  { name: "Priya Shah", initials: "PS", role: "Employee", cards: 2, spent: 2197.04, missing: "2 receipts" },
  { name: "Daniel Ortiz", initials: "DO", role: "Bookkeeper", cards: 0, spent: 0, missing: "All set" },
];

// ---------- Payments ----------

export const recipients = [
  { name: "Gusto Payroll", initials: "GP", total: 1_284_330.48, last: "Nov 1", status: "", taxDocs: true },
  { name: "Cooley LLP", initials: "CL", total: 212_000, last: "Oct 30", status: "", taxDocs: true },
  { name: "WeWork", initials: "WW", total: 294_000, last: "Oct 29", status: "", taxDocs: true },
  { name: "Bayou Creative Studio", initials: "BC", total: 48_250, last: "Oct 27", status: "Pending details", taxDocs: false },
  { name: "Harris County Tax Office", initials: "HC", total: 23_200, last: "Oct 24", status: "", taxDocs: false },
  { name: "Daniel Ortiz", initials: "DO", total: 18_400, last: "Oct 20", status: "", taxDocs: true },
  { name: "Lone Star Facilities", initials: "LS", total: 9_812.4, last: "Oct 18", status: "Pending details", taxDocs: false },
  { name: "Galleria Office Partners", initials: "GO", total: 147_000, last: "Oct 1", status: "", taxDocs: true },
  { name: "Texas Workforce Commission", initials: "TW", total: 6_102.33, last: "Sep 30", status: "", taxDocs: false },
  { name: "Summit IT Services", initials: "SI", total: 31_480, last: "Sep 22", status: "", taxDocs: true },
  { name: "Northwind Staffing", initials: "NS", total: 76_900, last: "Sep 15", status: "", taxDocs: false },
  { name: "Clearwater CPA Group", initials: "CC", total: 14_500, last: "Sep 3", status: "", taxDocs: true },
];

export type Bill = { due: string; status: "Overdue" | "Needs approval" | "Scheduled" | "Paid" | "Inbox"; recipient: string; amount: number; invoice: string; updated: string; source: "email" | "upload" };

export const bills: Bill[] = [
  { due: "Oct 15", status: "Overdue", recipient: "Lone Star Facilities", amount: 1290, invoice: "INV-2291", updated: "Nov 4", source: "email" },
  { due: "Oct 28", status: "Overdue", recipient: "Harris County Tax Office", amount: 11600, invoice: "HC-883346", updated: "Nov 4", source: "upload" },
  { due: "Nov 1", status: "Overdue", recipient: "Summit IT Services", amount: 220, invoice: "SIT-902", updated: "Nov 3", source: "email" },
  { due: "Nov 12", status: "Needs approval", recipient: "Bayou Creative Studio", amount: 4250, invoice: "BCS-118", updated: "Nov 3", source: "email" },
  { due: "Nov 15", status: "Scheduled", recipient: "Galleria Office Partners", amount: 24500, invoice: "GOP-1125", updated: "Nov 2", source: "upload" },
  { due: "Nov 20", status: "Scheduled", recipient: "Clearwater CPA Group", amount: 3500, invoice: "CCG-77", updated: "Nov 1", source: "email" },
  { due: "Nov 30", status: "Scheduled", recipient: "Northwind Staffing", amount: 9812.18, invoice: "NWS-4410", updated: "Oct 31", source: "email" },
  { due: "Oct 20", status: "Paid", recipient: "Cooley LLP", amount: 32000, invoice: "CO-55120", updated: "Oct 30", source: "upload" },
  { due: "Oct 1", status: "Paid", recipient: "WeWork", amount: 24500, invoice: "WW-10-26", updated: "Oct 29", source: "email" },
];

export const taxPayments = [
  { type: "Form 941 — Federal payroll", period: "Q3 2026", amount: 58_410.22, date: "Oct 15", status: "Paid" },
  { type: "Form 940 — FUTA", period: "2026", amount: 1_260, date: "Jan 31, 2027", status: "Scheduled" },
  { type: "Texas Franchise Tax", period: "2026", amount: 8_940, date: "May 15", status: "Paid" },
  { type: "Form 1120 — Estimated", period: "Q4 2026", amount: 42_000, date: "Dec 15", status: "Scheduled" },
  { type: "Form 1120 — Estimated", period: "Q3 2026", amount: 42_000, date: "Sep 15", status: "Paid" },
];

export const achAuthorizations = [
  { company: "Gusto Payroll", id: "9216004201", account: "Payroll ••5519", limit: "No limit", added: "Jan 4, 2025" },
  { company: "IRS USATAXPYMT", id: "3387702000", account: "Operating ••2210", limit: "No limit", added: "Mar 1, 2025" },
  { company: "WeWork", id: "1462738001", account: "Operating ••2210", limit: "$30,000 / mo", added: "Jun 12, 2025" },
  { company: "Amazon Web Services", id: "9111111103", account: "Operating ••2210", limit: "$20,000 / mo", added: "Aug 3, 2025" },
  { company: "Oakline Working Capital", id: "8102200417", account: "Operating ••2210", limit: "$2,200 / mo", added: "Jun 2, 2026" },
];

export const checkbookOrders = [
  { ordered: "Aug 14, 2026", account: "Operating ••2210", range: "#1201 – #1300", status: "Delivered" },
  { ordered: "Feb 2, 2026", account: "Operating ••2210", range: "#1101 – #1200", status: "Delivered" },
];

export const wireDrawdowns = [
  { requester: "Westbrook Capital Partners", amount: 128500, date: "Nov 4", account: "Operating ••2210", status: "Completed" },
  { requester: "Meridian Health", amount: 98115.4, date: "Sep 18", account: "Operating ••2210", status: "Completed" },
];

// ---------- Invoicing ----------

export type Invoice = {
  due: string;
  dueRel: string;
  status: "Overdue" | "Scheduled" | "Active" | "Paid";
  customer: string;
  email: string;
  amount: number;
  number: string;
  date: string;
  type: string;
  next?: string;
};

export const invoices: Invoice[] = [
  { due: "Oct 1", dueRel: "1 month ago", status: "Overdue", customer: "Meridian Health", email: "ap@meridianhealth.com", amount: 16500, number: "INV-0007", date: "Sep 1", type: "One time" },
  { due: "Oct 11", dueRel: "24 days ago", status: "Overdue", customer: "Bayview Dental Group", email: "billing@bayviewdental.com", amount: 15000, number: "INV-0008", date: "Sep 11", type: "One time" },
  { due: "Oct 16", dueRel: "19 days ago", status: "Overdue", customer: "Cypress Legal Services", email: "billing@cypresslegal.com", amount: 7500, number: "INV-0006", date: "Sep 16", type: "One time" },
  { due: "Dec 5", dueRel: "in 1 month", status: "Scheduled", customer: "Harlan Logistics", email: "invoices@harlanlogistics.com", amount: 7500, number: "INV-0013", date: "Nov 5", type: "One time" },
  { due: "Dec 5", dueRel: "in 1 month", status: "Scheduled", customer: "Westbrook Capital Partners", email: "ops@westbrookcap.com", amount: 12000, number: "INV-0014", date: "Nov 5", type: "One time" },
  { due: "Oct 31", dueRel: "4 days ago", status: "Active", customer: "Riverside Clinics", email: "ap@riversideclinics.com", amount: 2000, number: "INV-0025", date: "Oct 1", type: "Monthly", next: "Dec 1" },
  { due: "Oct 31", dueRel: "4 days ago", status: "Active", customer: "Pinecrest Ventures", email: "ap@pinecrest.vc", amount: 7500, number: "INV-0018", date: "Oct 1", type: "Monthly", next: "Dec 1" },
  { due: "Nov 25", dueRel: "in 21 days", status: "Active", customer: "Riverside Clinics", email: "ap@riversideclinics.com", amount: 2000, number: "INV-0034", date: "Oct 26", type: "One time" },
  { due: "Nov 30", dueRel: "in 26 days", status: "Active", customer: "Pinecrest Ventures", email: "ap@pinecrest.vc", amount: 7500, number: "INV-0009", date: "Oct 31", type: "One time" },
  { due: "Oct 20", dueRel: "15 days ago", status: "Paid", customer: "Harlan Logistics", email: "invoices@harlanlogistics.com", amount: 42150, number: "INV-0004", date: "Sep 20", type: "One time" },
];

export const invoiceTotals = {
  open: { amount: 88300, invoices: 13, links: 1 },
  overdue: { amount: 39000, invoices: 3 },
  paid: { amount: 75000, invoices: 18, links: 1 },
};

export const recurringSeries = [
  { customer: "Riverside Clinics", amount: 2000, cadence: "Monthly", next: "Dec 1", sent: 11, status: "Active" },
  { customer: "Pinecrest Ventures", amount: 7500, cadence: "Monthly", next: "Dec 1", sent: 6, status: "Active" },
  { customer: "Meridian Health", amount: 16500, cadence: "Quarterly", next: "Jan 1", sent: 4, status: "Paused" },
];

export const customers = [
  { name: "Meridian Health", email: "ap@meridianhealth.com", open: 16500, paid: 98115.4, invoices: 7 },
  { name: "Harlan Logistics", email: "invoices@harlanlogistics.com", open: 7500, paid: 132450.2, invoices: 9 },
  { name: "Westbrook Capital Partners", email: "ops@westbrookcap.com", open: 12000, paid: 260000, invoices: 4 },
  { name: "Riverside Clinics", email: "ap@riversideclinics.com", open: 4000, paid: 20000, invoices: 12 },
  { name: "Pinecrest Ventures", email: "ap@pinecrest.vc", open: 15000, paid: 37500, invoices: 7 },
  { name: "Bayview Dental Group", email: "billing@bayviewdental.com", open: 15000, paid: 0, invoices: 1 },
  { name: "Cypress Legal Services", email: "billing@cypresslegal.com", open: 7500, paid: 15000, invoices: 3 },
];

export const catalog = [
  { item: "Advisory retainer", type: "Service", price: 7500, unit: "per month" },
  { item: "Financial model build", type: "Service", price: 12000, unit: "per project" },
  { item: "Board deck preparation", type: "Service", price: 3500, unit: "per deck" },
  { item: "Hourly consulting", type: "Service", price: 275, unit: "per hour" },
  { item: "Market research report", type: "Product", price: 2000, unit: "each" },
];

// ---------- Payroll & Books ----------

export const payroll = {
  nextRun: "Nov 15",
  nextAmount: 156910,
  employees: 24,
  contractors: 6,
  runs: [
    { date: "Nov 15", type: "Regular", people: 24, gross: 156910, status: "Upcoming" },
    { date: "Nov 1", type: "Regular", people: 24, gross: 155810.16, status: "Paid" },
    { date: "Oct 15", type: "Regular", people: 23, gross: 151204.4, status: "Paid" },
    { date: "Oct 1", type: "Regular", people: 23, gross: 151204.4, status: "Paid" },
    { date: "Sep 26", type: "Bonus", people: 8, gross: 24000, status: "Paid" },
  ],
};

export const books = {
  month: "Oct 2026",
  revenue: 642980.11,
  expenses: 326770.42,
  pl: [
    { line: "Revenue", amount: 642980.11 },
    { line: "Cost of services", amount: -118400 },
    { line: "Payroll", amount: -156910 },
    { line: "Rent", amount: -24500 },
    { line: "Software", amount: -41208.66 },
    { line: "Legal & professional", amount: -32000 },
    { line: "Interest income", amount: 3106.42 },
  ],
};

