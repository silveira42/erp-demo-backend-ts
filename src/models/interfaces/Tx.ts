export default interface Tx {
	core: any;
	start(): Promise<void>;
	commit(): Promise<void>;
	rollback(): Promise<void>;
	end(): Promise<void>;
}
