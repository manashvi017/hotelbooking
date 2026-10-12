import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({
  search,
  onSearchChange,
  onSubmit,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  guests = "1 Room, 2 Adults",
}) {
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [appliedText, setAppliedText] = useState(guests);

  const updateCounter = (setter, value, min, max) => {
    setter(Math.min(Math.max(value, min), max));
  };

  const handleApply = () => {
    const text = `${rooms} Room${rooms > 1 ? "s" : ""}, ${adults} Adult${adults > 1 ? "s" : ""}${children ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}`;
    setAppliedText(text);
    setShowGuestPopup(false);
  };

  return (
    <div className="relative overflow-visible rounded-[18px] border border-slate-200/80 bg-[#e5e5e5] p-2 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
      <div className="grid gap-2 md:grid-cols-[1.5fr_1fr_1fr_1.3fr_0.9fr]">
        <div className="rounded-[14px] border border-[#d7d7d7] bg-[#f5f5f5] px-5 py-3 shadow-inner shadow-white/40">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
            City, Area or Property
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ghazibad"
            className="mt-2 w-full bg-transparent text-[18px] font-bold text-slate-900 placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        <div className="rounded-[14px] border border-[#d7d7d7] bg-[#f5f5f5] px-5 py-3 shadow-inner shadow-white/40">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Check-in
          </div>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="mt-2 w-full cursor-pointer bg-transparent text-[18px] font-bold text-slate-900 focus:outline-none"
          />
        </div>

        <div className="rounded-[14px] border border-[#d7d7d7] bg-[#f5f5f5] px-5 py-3 shadow-inner shadow-white/40">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Check-out
          </div>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => onCheckOutChange(e.target.value)}
            className="mt-2 w-full cursor-pointer bg-transparent text-[18px] font-bold text-slate-900 focus:outline-none"
          />
        </div>

        <div className="relative rounded-[14px] border border-[#d7d7d7] bg-[#f5f5f5] px-5 py-3 shadow-inner shadow-white/40">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Rooms & Guests
          </div>
          <button
            type="button"
            onClick={() => setShowGuestPopup((current) => !current)}
            className="mt-2 block w-full rounded-md text-left text-[18px] font-bold text-slate-900 transition hover:bg-white/60"
          >
            {appliedText}
          </button>

          {showGuestPopup && (
            <div className="absolute left-0 top-[calc(100%+12px)] z-30 w-[310px] rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
              <div className="space-y-5">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                  <span className="text-base font-semibold text-slate-800">Rooms</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateCounter(setRooms, rooms - 1, 1, 6)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xl text-slate-700 transition hover:border-slate-400"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-lg font-bold text-slate-900">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => updateCounter(setRooms, rooms + 1, 1, 6)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xl text-slate-700 transition hover:border-slate-400"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                  <span className="text-base font-semibold text-slate-800">Adults</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateCounter(setAdults, adults - 1, 1, 10)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xl text-slate-700 transition hover:border-slate-400"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-lg font-bold text-slate-900">{adults}</span>
                    <button
                      type="button"
                      onClick={() => updateCounter(setAdults, adults + 1, 1, 10)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xl text-slate-700 transition hover:border-slate-400"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                  <span className="text-base font-semibold text-slate-800">Children</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateCounter(setChildren, children - 1, 0, 8)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xl text-slate-700 transition hover:border-slate-400"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-lg font-bold text-slate-900">{children}</span>
                    <button
                      type="button"
                      onClick={() => updateCounter(setChildren, children + 1, 0, 8)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xl text-slate-700 transition hover:border-slate-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApply}
                className="mt-6 w-full rounded-xl bg-[#2c7ef7] px-4 py-3 text-base font-bold text-white shadow-[0_14px_26px_rgba(44,126,247,0.28)] transition hover:bg-[#246fe6]"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="flex items-center justify-center rounded-[14px] bg-gradient-to-r from-[#3a8af9] to-[#2c7ef7] px-5 py-4 text-[18px] font-black uppercase tracking-wider text-white shadow-[0_12px_25px_rgba(59,130,246,0.35)] transition hover:brightness-110"
        >
          <Search size={18} className="mr-2" />
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
