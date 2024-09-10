export default function ProductOptions({
	name,
	values,
	selectedOptions,
	setOptions,
}) {
	return (
		<fieldset className="mt-3">
			<legend className="text-xl font-semibold">{name}</legend>
			<div className="inline-flex items-center flex-wrap">
				{values.map((value) => {
					const id = `option-${name}-${value.name}`;
					const checked = selectedOptions[name] === value.name;
					return (
						<label key={id} htmlFor={id}>
							<input
								className="sr-only "
								type="radio"
								id={id}
								name={`option-${name}`}
								value={value.name}
								checked={checked}
								onChange={() => {
									setOptions(name, value.name);
								}}
							/>
							<div
								className={`p-2 mt-3 text-lg rounded-full block cursor-pointer mr-3 ${
									checked
										? "text-white bg-gray-900"
										: "text-gray-900 bg-gray-200"
								}`}
							>
								<span className="px-2">{value.name}</span>
							</div>
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}
