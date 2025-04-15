import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1aWdxd2N6bWRkZXZhbWd0aHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTEyNzUsImV4cCI6MjA2MDI4NzI3NX0.9Vu6Myvzz5ZHsSL9eU69mnVMELZSu0ndlCSg6TmPASg",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1aWdxd2N6bWRkZXZhbWd0aHRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDcxMTI3NSwiZXhwIjoyMDYwMjg3Mjc1fQ.boBDtW7eg994blBke_7pNdq_Nqv03u3DyzXdxwHbX5s"
);

export default function SchmackApp({ user }) {
  const [showLoveMoin, setShowLoveMoin] = useState(false);

  useEffect(() => {
    const channel = supabase.channel("schmack-channel")
      .on("broadcast", { event: "liebeliebe" }, (payload) => {
        if (user === "carla") {
          setShowLoveMoin(true);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleLiebeLiebe = async () => {
    await supabase.channel("schmack-channel").send({
      type: "broadcast",
      event: "liebeliebe",
      payload: { from: user },
    });
  };

  const handleLiebeMoin = () => {
    setShowLoveMoin(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        {user === "paul" && (
          <button
            className="px-6 py-3 rounded-full text-white bg-black text-xl shadow"
            onClick={handleLiebeLiebe}
          >
            liebeliebe
          </button>
        )}

        {user === "carla" && showLoveMoin && (
          <button
            className="px-6 py-3 rounded-full text-white bg-black text-xl shadow"
            onClick={handleLiebeMoin}
          >
            liebemoin
          </button>
        )}

        {user === "carla" && !showLoveMoin && (
          <p className="text-gray-400">Warten auf liebe ...</p>
        )}
      </div>
    </div>
  );
}
