const CourseTypeSidebar = ({ courseTypes, selectedType, onTypeChange }) => {
    return (
        <div className="w-64 bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Course Type</h3>
            <div className="space-y-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedType === 'ALL'}
                        onChange={() => onTypeChange('ALL')}
                        className="mr-2"
                    />
                    ALL
                </label>
                {courseTypes.map((type) => (
                    <label key={type.id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedType === type.name}
                            onChange={() => onTypeChange(type.name)}
                            className="mr-2"
                        />
                        {type.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CourseTypeSidebar;
