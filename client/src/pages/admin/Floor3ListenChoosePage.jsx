import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Overlay from "../../components/common/Overlay";
import {
  getAllFloor3Questions,
  getFloor3QuestionById,
  createFloor3Question,
  updateFloor3Question,
  deleteFloor3Question,
} from "../../api/floorApi";
import { showNotification } from "../../components/showNotification";
import useActionStore from "../../store/actionStore";

const Floor3ListenChoosePage = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    audio_url: "",
    options: ["", "", ""],
    correct_answer: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [audioPreview, setAudioPreview] = useState(null);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const { setIsLoading } = useActionStore();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllFloor3Questions();
      setQuestions(res.data || res);
    } catch (err) {
      showNotification(err.message || "Lỗi khi tải dữ liệu", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const validateForm = () => {
    const { question, audio_url, options, correct_answer } = formData;

    if (!question.trim())
      return setValidationError("Câu hỏi không được để trống.");

    if (!audio_url) return setValidationError("Phải tải lên file âm thanh.");

    if (options.length !== 3 || options.some((opt) => !opt.trim())) {
      return setValidationError("Phải nhập đủ 3 lựa chọn.");
    }

    const trimmedOptions = options.map((opt) => opt.trim());
    const uniqueOptions = new Set(trimmedOptions);

    if (uniqueOptions.size !== trimmedOptions.length) {
      return setValidationError("Các lựa chọn không được trùng nhau.");
    }

    if (
      !correct_answer.trim() ||
      !trimmedOptions.includes(correct_answer.trim())
    ) {
      return setValidationError(
        "Đáp án đúng phải trùng với một trong 3 lựa chọn."
      );
    }

    setValidationError(null);
    return true;
  };

  const handleAudioUpload = async (file) => {
    setUploadingAudio(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", import.meta.env.VITE_REACT_UPLOAD_PRESET);
      setIsLoading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME
        }/video/upload`,
        { method: "POST", body: data }
      );
      setIsLoading(false);
      const result = await res.json();
      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, audio_url: result.secure_url }));
        setAudioPreview(result.secure_url);
        showNotification("Tải lên audio thành công", "success");
      } else {
        throw new Error();
      }
    } catch {
      showNotification(
        "Không thể tải âm thanh lên. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setUploadingAudio(false);
    }
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleAudioUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return showNotification(validationError, "error");
    }

    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        options: formData.options,
      };
      let res;
      if (editingId) {
        res = await updateFloor3Question(editingId, payload);
      } else {
        res = await createFloor3Question(payload);
      }
      showNotification(res.message, res.status);
      resetForm();
      loadData();
    } catch (err) {
      showNotification(err.message || "Lỗi khi xử lý dữ liệu", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setEditingId(id);
    setIsFormVisible(true);
    try {
      const res = await getFloor3QuestionById(id);
      const question = res.data || res;
      setFormData({
        question: question.question,
        audio_url: question.audio_url,
        options: JSON.parse(question.options),
        correct_answer: question.correct_answer,
      });
      setAudioPreview(question.audio_url);
    } catch (err) {
      showNotification("Không thể tải câu hỏi", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?")) {
      try {
        setIsLoading(true);
        await deleteFloor3Question(id);
        setIsLoading(false);
        loadData();
        showNotification("Xóa thành công", "success");
      } catch (err) {
        showNotification("Lỗi khi xóa câu hỏi", "error");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      question: "",
      audio_url: "",
      options: ["", "", ""],
      correct_answer: "",
    });
    setEditingId(null);
    setIsFormVisible(false);
    setValidationError(null);
    setAudioPreview(null);
  };

  const handleAddNewClick = () => {
    resetForm();
    setIsFormVisible(true);
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Tầng 3: Listen & Choose</h2>

        <input
          className="mb-4 px-3 py-2 border rounded w-full"
          placeholder="Tìm kiếm câu hỏi"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={handleAddNewClick}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Thêm mới
        </button>

        {isFormVisible && (
          <Overlay className="z-[1000]">
            <div className="bg-white w-1/2 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
              <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-4 rounded mb-6"
              >
                <textarea
                  name="question"
                  placeholder="Nhập câu hỏi"
                  className="w-full mb-2 p-2 border rounded"
                  value={formData.question}
                  onChange={handleInputChange}
                />
                <input
                  type="file"
                  accept="audio/*"
                  className="mb-2"
                  onChange={handleAudioFileChange}
                  disabled={uploadingAudio}
                />
                {audioPreview && (
                  <audio controls className="mb-2">
                    <source src={audioPreview} type="audio/mpeg" />
                  </audio>
                )}
                {formData.options.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={["A", "B", "C"][idx]}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                  />
                ))}
                <input
                  name="correct_answer"
                  placeholder="Đáp án đúng"
                  className="w-full mb-2 p-2 border rounded"
                  value={formData.correct_answer}
                  onChange={handleInputChange}
                />
                {validationError && (
                  <p className="text-red-500 mb-2">{validationError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    {editingId ? "Cập nhật" : "Thêm mới"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </Overlay>
        )}

        <ul>
          {filteredQuestions.map((q) => (
            <li key={q.id} className="mb-4 p-4 border rounded shadow">
              <p className="font-semibold">ID: {q.id}</p>
              <p>{q.question}</p>
              <audio controls className="my-2">
                <source src={q.audio_url} type="audio/mpeg" />
              </audio>
              <ul className="list-disc ml-5">
                {JSON.parse(q.options).map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <p className="text-green-600 mt-1">
                Đáp án đúng: {q.correct_answer}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(q.id)}
                  className="bg-yellow-500 px-3 py-1 text-white rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="bg-red-600 px-3 py-1 text-white rounded"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Floor3ListenChoosePage;
